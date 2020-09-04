/* eslint-disable no-await-in-loop */
const mongoose = require('mongoose');
const Product = require('../models/product');
const Category = require('../models/category');

module.exports = {
  getStoreFeaturedProducts(storeId) {
    return Category.aggregate([
      {
        $match: {
          store_id: mongoose.Types.ObjectId(storeId)
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: 'parent',
          as: 'subcategories'
        }
      },
      {
        $unwind: '$subcategories'
      },
      {
        $match: {
          'subcategories.status': 1
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: 'subcategories._id',
          foreignField: 'category_id',
          as: 'subcategories.products'
        }
      },
      {
        $group: {
          _id: {
            subcategories: '$subcategories'

          }
        }
      },
      {
        $replaceRoot: { newRoot: '$_id.subcategories' }
      },
      {
        $project: {
          products: {
            $filter: {
              input: '$products',
              as: 'item',
              cond: {
                $and: [
                  { $eq: ['$$item.status', 1] },
                  '$$item.is_featured'
                ]
              }
            }
          }
        }
      },
      {
        $unwind: '$products'
      },
      {
        $group: {
          _id: '$abc', // group all by null field
          products: { $push: '$products' }
        }
      }
    ]);
  },

  getProduct(request) {
    return Product.findOne(request);
  },

  getProductById(id) {
    return Product.findById(id);
  },

  updateProduct(criteria, details) {
    return Product.findOneAndUpdate(criteria, details, { new: true });
  },

  getBestSellingProducts(storeId) {
    return Category.aggregate([
      {
        $match: {
          store_id: mongoose.Types.ObjectId(storeId)
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: 'parent',
          as: 'subcategories'
        }
      },
      {
        $unwind: '$subcategories'
      },
      {
        $match: {
          'subcategories.status': 1
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: 'subcategories._id',
          foreignField: 'category_id',
          as: 'subcategories.products'
        }
      },
      {
        $group: {
          _id: {
            subcategories: '$subcategories'

          }
        }
      },
      {
        $replaceRoot: { newRoot: '$_id.subcategories' }
      },
      {
        $project: {
          products: {
            $filter: {
              input: '$products',
              as: 'item',
              cond: {
                $and: [
                  { $eq: ['$$item.status', 1] },
                  '$$item.is_best_selling'
                ]
              }
            }
          }
        }
      },
      {
        $unwind: '$products'
      },
      {
        $group: {
          _id: '$abc', // group all by null field
          products: { $push: '$products' }
        }
      }
    ]);
  },

  addProductToStore(details) {
    return new Product(details).save();
  },

  getProducts(criteria) {
    if (criteria.subcategory_id) {
      const condition = {
        $and:
          [
            {
              $or:
                [
                  { name: new RegExp(criteria.search, 'i') },
                  { tags: { $regex: criteria.search, $options: 'i' } }
                ]
            },
            {
              ...(criteria.store_id && { store_id: mongoose.Types.ObjectId(criteria.store_id) }),
              category_id: mongoose.Types.ObjectId(criteria.subcategory_id)
            }
          ]
      };

      return Product
        .find(condition, null, { sort: { created_at: -1 } })
        .limit(criteria.perPage)
        .skip((criteria.pageNo - 1) * criteria.perPage);
    } if (criteria.category_id) {
      return Product.aggregate([
        {
          $lookup: {
            from: 'categories',
            localField: 'category_id',
            foreignField: '_id',
            as: 'subcategory'
          }
        },
        {
          $unwind: '$subcategory'
        },
        {
          $lookup: {
            from: 'categories',
            localField: 'subcategory.parent',
            foreignField: '_id',
            as: 'subcategory.category'
          }
        },
        {
          $unwind: '$subcategory.category'
        },
        {
          $match: {
            $and:
              [
                {
                  $or:
                    [
                      { name: new RegExp(criteria.search, 'i') },
                      { tags: { $regex: criteria.search, $options: 'i' } }
                    ]
                },
                {
                  'subcategory.category._id': mongoose.Types.ObjectId(criteria.category_id),
                  'subcategory.category.store_id': mongoose.Types.ObjectId(criteria.store_id),
                  'subcategory.status': 1
                }
              ]
          }
        },
        {
          $addFields: {
            parent_category_id: '$subcategory.category._id'
          }
        },
        {
          $project: {
            subcategory: 0
          }
        },
        {
          $sort: {
            created_at: -1
          }
        },
        {
          $skip: ((criteria.pageNo - 1) * criteria.perPage)
        },
        {
          $limit: criteria.perPage
        }
      ]);
    }

    return Product.aggregate([
      {
        $match: {
          $and:
            [
              {
                $or:
                  [
                    { name: new RegExp(criteria.search, 'i') },
                    { tags: { $regex: criteria.search, $options: 'i' } }
                  ]
              },
              {
                store_id: mongoose.Types.ObjectId(criteria.store_id)
              }
            ]
        }
      },
      {
        $skip: ((criteria.pageNo - 1) * criteria.perPage)
      },
      {
        $limit: criteria.perPage
      }
    ]);
  },

  getProductsWithPagination(request, pageNo, perPage, criteria, sort) {
    let filter = {} ;
    filter.store_id = criteria.store_id ;
    if(criteria.subcategory_id) {
      filter.category_id = criteria.subcategory_id
    }
    const condition = {
      $and:
        [
          {
            $or:
              [
                { name: new RegExp(criteria.search, 'i') },
                { tags: { $regex: criteria.search, $options: 'i' } }
              ]
          },
         filter
        ]
    };

    return Product.find(condition).skip((pageNo - 1) * perPage).limit(perPage).sort(sort);
  },

  getTotalProductsCount(request, criteria) {
    let filter = {};
    filter.store_id = criteria.store_id;
    if (criteria.subcategory_id) {
      filter.category_id = criteria.subcategory_id
    }
    const condition = {
      $and: [
        {
          $or: [
            { name: new RegExp(criteria.search, 'i') }
          ]
        },
        filter
      ]
    };
    return Product.countDocuments(condition);
  },

  deleteProduct(request) {
    return Product.deleteOne(request);
  },

  async addProductsFromSku(data, storeId) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      for (let i = 0; i < data.length; i++) {
        const element = data[i];

        const { sku_id: skuId } = element;
        if (!skuId) throw new Error(`Sku ID is required at index ${i}`);

        const product = await Product.findOne({ sku_id: skuId });
        if (!product) throw new Error(`Sku ID is Invalid at index ${i}`);

        if (product.store_id !== storeId) throw new Error(`Invalid Auth Token for Product at index ${i}`);

        if (element.quantity) {
          if (Number.isNaN(Number(element.quantity)) || Number(element.quantity) < 0) throw new Error(`Quantity is Invalid at index ${i}`);
        }

        element.selling_price = element.selling_price || product.price.cost_price;
        element.discounted_price = element.discounted_price || product.price.sale_price;

        if (Number.isNaN(Number(element.selling_price)) || Number(element.selling_price) < 1) throw new Error(`Selling Price is Invalid at index ${i}`);
        if (Number.isNaN(Number(element.discounted_price)) || Number(element.discounted_price) < 1) throw new Error(`Discounted Price is Invalid at index ${i}`);

        if (Number(element.selling_price) < Number(element.discounted_price)) throw new Error(`Discounted Price cannot be greater than the selling Price, Error at index ${i}`);

        const updateObject = {};

        if (element.quantity) updateObject.stock_quantity = element.quantity;

        if (element.selling_price || element.discounted_price) updateObject.price = {};

        if (element.selling_price) {
          updateObject.price.cost_price = element.selling_price;
        }
        if (element.discounted_price) {
          updateObject.price.sale_price = element.discounted_price;
        }

        await Product.updateOne(
          { _id: product._id },
          updateObject,
          { new: true, runValidators: true, session }
        );
      }

      await session.commitTransaction();
      session.endSession();

      return {
        success: true,
        message: 'All products have been updated Successfully.'
      };
    } catch (e) {
      await session.abortTransaction();
      session.endSession();

      return {
        success: false,
        error: e
      };
    }
  }
};
