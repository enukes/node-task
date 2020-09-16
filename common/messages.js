module.exports = {

  PASSWORD_REQUIRED: 'Password is a required field.',
  NEW_PASSWORD_REQUIRED: 'New Password is a required field.',
  // CONFIRM_PASSWORD_REQUIRED: 'Confirm password is a required field.',
  EMAIL_REQUIRED: 'Email address is a required field.',
  FULL_NAME_REQUIRED: 'Full name is a required field.',
  NAME_REQUIRED: 'Name is a required field.',
  USERNAME_REQUIRED: 'Username is a required field.',
  USERNAME_OR_PASSWORD_INVALID: 'Username or Password is invalid',
  PASSWORD_INVALID: 'Password is invalid',
  OTP_REQUIRED: 'OTP is a required field.',
  USER_ID_REQUIRED: 'User Id is a required field',
  ID_INVALID: 'Id is invalid',
  STATUS_ALREADY_EXIST: 'Status is already same',
  STATUS_PERMISSION:'You do not have permission to change status',
  DEVICE_TOKEN_PERMISSION:'You do not have permission to change device token',
  LINK_INVALID: 'Link is invalid',
  STATUS_REQUIRED: 'Status is a required field',
  SUBCATEGORY_REQUIRED: 'Subcategory is a required field',
  LATITUDE_REQUIRED: 'Latitude is a required field',
  LONGITUDE_REQUIRED: 'Longitude is a required field',
  DEVICE_TOKEN_REQUIRED: 'Device token is a required field',
  // USER_ID_REQUIRED: 'User id is a required field.',
  // RELATION_REQUIRED: 'Relation is a required field.',
  // BIRTH_DATE_REQUIRED: 'Birth date is a required field.',
  // GENDER_REQUIRED: 'Gender is a required field.',
  CONTACT_REQUIRED: 'Contact number is a required field.',
  CONTACT_INVALID: 'Contact number is not registered With Us',
  EMAIL_OR_CONTACT_INVALID: 'Email or contact number is not registered with Us',
  EMAIL_ALREADY_EXIST: 'Email address already exists.',
  CONTACT_ALREADY_EXIST: 'Contact number already exists.',
  COUPON_ALREADY_EXIST: 'Coupon already exists.',

  PASSWORD_RESET_TOKEN_REQUIRED: 'Password reset token is a required field.',
  PASSWORD_RESET_TOKEN_INVALID: 'Password reset token is invalid',
  PASSWORD_UPDATED_SUCCESSFULLY: 'Password has been updated Successfully',
  VERIFICATION_TOKEN_REQUIRED: 'Verification token is a required field',
  VERIFICATION_TOKEN_INVALID: 'Verification token is invalid',
  TOKEN_REQUIRED: 'Token is a required field',
  TOKEN_INVALID: 'Token is invalid',
  AUTHENTICATION_TOKEN_INVALID: 'Authentication token is invalid',
  AUTHENTICATION_TOKEN_REQUIRED: 'Authentication token is a required field',
  UNAUTHORIZED_ACCESS: 'You are not Authorized for this Operation',
  OTP_VIA_CONTACT_NUMBER: 'An OTP was sent to your contact number. Please check.',
  LINK_VIA_EMAIL: 'An link was sent to your email address. Please check.',
  OTP_VIA_EMAIL_ID: 'An OTP was sent to your email id. Please check.',
  LINK_VIA_EMAIL_ID: 'An verification link was sent to your email id. Please check.',
  LINK_VIA_EMAIL_ID_RESET: 'An reset password link was sent to your email id. Please check.',
  OTP_MISMATCH: 'Invalid otp. Please try again.',
  TOKEN_MISMATCH: 'Invalid token. Please try again.',
  OTP_EXPIRED: 'OTP Expired. Please click on resend OTP.',
  OTP_NOT_VERIFIED: 'Please Verify OTP First.',
  CUSTOMER_INACTIVE: 'You are not allowed to Login currently . Please contact Admin for further details',

  CITY_ID_REQUIRED: 'City Id is a required field',
  CITY_ID_INVALID: 'City Id is Invalid',
  AREA_ID_REQUIRED: 'Area Id is a required field',
  AREA_ID_INVALID: 'Area Id is Invalid',
  ADDRESS_ID_REQUIRED: 'Address Id is a required field',
  ADDRESS_ID_INVALID: 'Address Id is invalid',

  // Store Category
  STORE_CATEGORY_ID_INVALID: 'Store category id is Invalid',
  STORE_CATEGORY_ID_ASSOCIATED: 'Store category id is associated with store',

  // Product validation
  PRODUCT_PICTURE_REQUIRED: 'Product Picture is a required field',
  PRODUCT_SIZE_REQUIRED: 'Product Size is a required field',
  PRICE_GREATER_THAN_0: 'The price must be greater than 0.',
  PRICE_REQUIRED: 'The price is a required field.',
  STOCK_QUANTITY_NON_NEGATIVE: 'The stock quantity cannot be negative.',
  STOCK_QUANTITY_REQUIRED: 'The stock quantity is a required field.',
  PRODUCT_INACTIVE: 'Some of the products are Inactive',

  // store validation
  STORE_PICTURE_REQUIRED: 'Store Picture is a required field',
  STORE_PERMISSION: 'You need to approve your Store, before changing the Status',
  STORE_DOESNT_SUPPORT_EXPRESS_DELIVERY: 'This Store Doesn\'t provide express delivery',
  OWNER_DETAILS_REQUIRED: 'Owner Details Are Required',
  ADDRESS_REQUIRED: 'Address Details Are Required',
  STORE_ADDRESS_ID_INVALID: 'Store Address Id is Invalid',
  TIMINGS_REQUIRED: 'Timing Details Are Required',
  STORE_ORDER_EXISTS_CANNOT_BE_DELETED: 'Above store cannot be deleted as order has already been placed from this store. Please disable it to avoid any further orders.',

  // category validation
  CATEGORY_PICTURE_REQUIRED: 'Category Picture is a required field',
  CATEGORY_ID_REQUIRED: 'category id is Required',
  STORE_CATEGORY_MISMATCH: 'Store can only add/edit categories that are under it.',

  FCM_TOKEN_REQUIRED: 'Fcm token is a required field.',

  // cart Validation
  STORE_ID_REQUIRED: 'The Store Id is a required field',
  STORE_INACTIVE: 'The Store is not active . Please Contact Admin.',
  DRIVER_INACTIVE: 'The Driver is not active . Please Contact Admin.',
  CUSTOMER_INACTIVE: 'The Customer is not active . Please Check Email ID.',
  DRIVER_APPROVAL: 'The Driver is not approve . Please Contact Admin.',
  STORE_NAME_REQUIRED: 'The Store Name is a required field',
  STORE_ID_INVALID: 'The Store Id is invalid',
  QUANTITY_NON_NEGATIVE: 'The quantity cannot be negative.',
  QUANTITY_REQUIRED: 'The quantity is a required field.',
  COUNT_REQUIRED: 'The Count is a required field.',
  COUNT_GREATER_THAN_0: 'The Count must be greater than 0.',

  // order Validation
  TOTAL_AMOUNT_REQUIRED: 'Total amount is a required field.',
  TOTAL_AMOUNT_NON_NEGATIVE: 'Total amount cannot be negative.',
  DISCOUNT_NON_NEGATIVE: 'Discount cannot be negative.',
  PRODUCTS_REQUIRED: 'There should be atleast 1 Product while placing order',
  PRODUCT_ID_REQUIRED: 'Product Id is a required Field',
  SLOT_ID_REQUIRED: 'Slot Id is a required Field',
  SLOT_ID_INVALID: 'Slot Id is Invalid',
  SLOT_INACTIVE: 'Current Slot Is Unavailable',
  SLOT_FULL: 'Sorry Current Slot is Full. Please Select another Slot.',
  ORDER_ALREADY_ACCEPTED: 'This Order has already been accepted by other driver.',
  STORE_HASNT_ACCEPTED_ORDER: 'The store hasn\'t accepted the order yet',
  ORDER_ID_REQUIRED: 'The Order Id is a required field',
  ORDER_ID_INVALID: 'The Order Id is Invalid.',
  ORDER_CANNOT_BE_CANCELLED_AFTER_PICKUP: 'Order cannot be cancelled after it\'s been picked up by the driver.',
  ORDER_CANNOT_BE_CANCELLED_AFTER_DELIVERED: 'Order cannot be cancelled after it\'s been Delivered.',
  ORDER_CANNOT_BE_CANCELLED_AFTER_CANCELLED: 'Already Cancelled Order cannot be cancelled.',
  PRODUCTS_CANNOT_BE_REMOVED_AFTER_DELIVERY: 'Products can not be removed after order has been delivered.',
  PRODUCTS_CANNOT_BE_REMOVED_THERE_IS_SINGLE_PRODUCT: 'Products can not be removed as there is only single product in the order.',
  ORDER_CANNOT_BE_CANCELLED_NOW: 'The Order cannot be cancelled. Please Contact Customer Support.',
  ORDER_INVOICE_UNAVAILABLE: 'Invoice are only available for orders that are delivered.',

  IMAGE_REQUIRED: 'Image is a required ',

  // cart
  STORE_ID_MISMATCH: 'Cart has entities from different store.',

  STREET_NAME_REQUIRED: 'Street name is a required field',
  HOUSE_NO_REQUIRED: 'House No. is a required field',
  ALIAS_REQUIRED: 'Alias is a required field',

  // coupon
  COUPON_VALUE_REQUIRED: 'Coupon Value is a required field',
  COUPON_VALUE_GREATER_THAN_0: 'Coupon Value must be greater than 0',
  COUPON_CODE_INVALID: 'Coupon Code is Not Valid',
  COUPON_INVALID: 'Coupon is Not Valid',
  COUPON_ID_INVALID: 'Coupon ID is Not Valid',
  COUPON_CODE_REQUIRED: 'Coupon Code is Required',
  COUPON_CODE_ALREADY_USED: 'Coupon can only be used once.',
  COUPON_ORDER_MIN_VALUE: 'Minumum Value must be greater than 0.',
  COUPON_ORDER_MIN_VALUE_REQUIRED: 'Minimum Order Amount Required.',
  CART_VALUE_REQUIRED: 'Total Cart Amount is Required.',

  FROM_DATE_REQUIRED: 'From Date is a Required Field',
  TO_DATE_REQUIRED: 'To Date is a Required Field',

  DRIVER_NOT_ONLINE: 'You have to online to do this operation.',

  // Delivery charges
  DELIVERY_ORDER_AMOUNT_REQUIRED: 'Delivery Order Amount is a required Field.',
  DELIVERY_CHARGES_REQUIRED: 'Delivery Charges is a required Field.',
  DELIVERY_ORDER_AMOUNT_GREATER_THAN_0: 'Delivery Order Amount must be greater than 0.',
  DELIVERY_CHARGES_GREATER_THAN_0: 'Delivery Charges must be greater than 0.',
  DELIVERY_ORDER_AMOUNT_ASCENDING_ORDER: 'Delivery Order Amount must be in ascending Order.',

  // Driver
  DRIVER_ID_REQUIRED: 'Driver Id is a required field',
  DRIVER_IS_ASSOCIATED: 'Driver is either associated with any store or with any order',
  IS_ONLINE_REQUIRED: 'online status is required',
  DRIVER_ID_INVALID: 'Driver Id is invalid',
  DRIVER_PERMISSION: 'You need to approve your Driver, before changing the Status',


  // Service
  SERVICE_SIZE_REQUIRED: 'Size is a required field',
  SERVICE_ID_REQUIRED: 'Service Id is a required field',

  // Service Category
  SERVICE_PROVIDER_CATEGORY_ID_INVALID: 'Service Provider category id is Invalid',
  SERVICE_PROVIDER_CATEGORY_ID_ASSOCIATED: 'Service Provider category id is associated with Service Provider',

  // Service Provider
  SERVICE_PROVIDER_ID_INVALID: 'Service Provider id is Invalid',
  SERVICE_PROVIDER_ORDER_EXISTS_CANNOT_BE_DELETED: 'Above Service Provider cannot be deleted as order has already been placed from this Service Provider. Please disable it to avoid any further orders.',
  SERVICE_PROVIDER_PERMISSION: 'You need to approve your Service Provider, before changing the Status',

  // Service Order Validation
  SERVICES_REQUIRED: 'There should be atleast 1 Service while placing order',
  SERVICE_ORDER_ID_REQUIRED: 'The Service Order Id is a required field',
  SERVICE_PROVIDER_ORDER_ID_REQUIRED: 'The Service Order Id is a required field',
  SERVICE_ID_INVALID: 'Service Provider id is Invalid',

  //Rating
  RATING_REQUIRED: 'Rating is a required field',

  //Order Verify
  SCANNED_BY_REQUIRED: 'Scanned by is a required field',
  CODE_TYPE_REQUIRED: 'Code Type is a required field',
  CODE_REQUIRED: 'Code is Required',
  CODE_TYPE_INVALID: 'Code Type is invalid',
  ORDER_VERIFIED: 'Order is verified successfully',
  ORDER_UNVERIFIED: 'Order verification failed',

  //Delivery Charges
  MINIMUM_DISTANCE: 'Minimum distance is required',
  BASE_PRICE: 'Base Price is required',
  KM_PRICE: 'Kilometer price is required'

};
