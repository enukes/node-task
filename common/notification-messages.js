module.exports = {

  orderPlace: ({ orderId }) => ({
    title: 'New order!',
    body: `A new Order has arrived with order id ${orderId}, Please Accept it now.`
  }),

  orderCancelled: ({ orderId }) => ({
    title: 'Order cancelled!',
    body: `Order with order id ${orderId} has been cancelled by customer.`
  }),


  driverAssigned: ({ orderId }) => ({
    title: 'Driver assigned!',
    body: `Order with order id ${orderId} has been assigned to you.`
  }),

  orderStatusChange: ({
    title,
    orderId,
    status,
    driverName = null,
    cancelReason = null
  }) => ({
    title: title || 'Order status changed!',
    body: `Your order with order id ${orderId}, ${status}${cancelReason ? ` due to ${cancelReason}, ` : ''}${driverName ? ` by ${driverName}` : ''}`
  })

};
