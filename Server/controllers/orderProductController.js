const { OrderProduct, Order, Product } = require('../models/models')
const ApiError = require('../error/ApiError')

class OrderProductController {

  async getAll(req, res) {

    try {
      let { orderId, productId } = req.query

      let orders;
      if (!orderId && !productId) {
        orders = await OrderProduct.findAll({
          include: [{
            model: Order
          },
          {
            model: Product,
            attributes: ['name']
          }],
          // attributes: ["id", "orderId", "quantity", "createdAt", "updatedAt"],
        })
      }

      const orderResults = orders.map((order) => ({
        id: order.id,
        orderId: order.orderId,
        productName: order.dataValues.product.name,
        price:order.price,
        quantity: order.quantity,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      }));

      return res.json({ orders: orderResults });
    } catch (error) {
      console.error(error);
      return next(ApiError.internal('Something went wrong, please try again later!!!'))
    }
  }

  // async getOne(req, res, next) {
  //   try {
  //     const orderId = req.params.orderId;
  //     const orderProductId = req.params.orderProductId;

  //     const orderProduct = await OrderProduct.findOne({
  //       where: { id: orderProductId, orderId: orderId },
  //       include: [{
  //         model: Order
  //       },
  //       {
  //         model: Product,
  //         attributes: ['name']
  //       }],
  //       attributes: ["id", "orderId", "quantity", "createdAt", "updatedAt"],
  //     });

  //     if (!orderProduct) {
  //       return next(ApiError.notFound(`Order Product with id ${orderProductId} not found for order ${orderId}`));
  //     }

  //     const orderProductResult = {
  //       id: orderProduct.id,
  //       orderId: orderProduct.orderId,
  //       productName: orderProduct.dataValues.product.name,
  //       quantity: orderProduct.quantity,
  //       createdAt: orderProduct.createdAt,
  //       updatedAt: orderProduct.updatedAt,
  //     };

  //     return res.json({ orderProduct: orderProductResult });
  //   } catch (error) {
  //     console.error(error);
  //     return next(ApiError.internal('Something went wrong, please try again later!!!'));
  //   }
  // }
}

module.exports = new OrderProductController()