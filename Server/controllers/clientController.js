const {
  Client,
  Cart,
  Product,
  CartProduct,
  Order,
  OrderProduct,
} = require("../models/models");
const ApiError = require("../error/ApiError");
const { model } = require("../db");

class ClientController {
  async create(req, res) {
    const { name, phone, type } = req.body;

    const candidate = await Client.findOne({ where: { phone } });
    if (candidate) {
      return next(ApiError.badRequest("Տվյալ հեռախոսահամարն օգտագործված է"));
    }

    const client = await Client.create({ name, phone, type });
    const cart = await Cart.create({ clientId: client.id });
    return res.json({ client });
  }

  async getAll(req, res, next) {
    try {
      const clients = await Client.findAll({
        include: [
          {
            model: Cart,
            attributes: ["id"],
            include: [
              {
                model: CartProduct,
                attributes: ["quantity"],
                include: [
                  {
                    model: Product,
                    attributes: ["price"],
                  },
                ],
              },
              {
                model: Order,
                attributes: ["id"],
                include: [
                  {
                    model: OrderProduct,
                    attributes: ["quantity"],
                    include: [
                      {
                        model: Product,
                        attributes: ["price"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
      //this code brings clients + sum of their carts
      const clientResults = clients.map((client) => {
        const cart = client.dataValues.cart;
        const ordersCount =
          cart && cart.dataValues.orders
            ? cart.dataValues.orders.length
            : '0';
            const ordersSum =
            cart && cart.dataValues.orders
              ? client.dataValues.cart.dataValues.orders.reduce((sum, orders) => {
                  return (
                    sum +
                    orders.dataValues.order_products.reduce((sum, order_product) => {
                      return (
                        sum +
                        order_product.quantity *
                          order_product.product.dataValues.price
                      );
                    }, 0)
                  );
                }, 0)
              : null;          
        const cartSum =
          cart && cart.dataValues.cart_products.length
            ? cart.dataValues.cart_products.reduce((sum, cartProduct) => {
                return (
                  sum +
                  cartProduct.quantity * cartProduct.product.dataValues.price
                );
              }, 0)
            : '0';

        return {
          id: client.id,
          name: client.name,
          type: client.type,
          phone: client.phone,
          cartId: cart ? cart.id : null,
          cartSum,
          ordersCount,
          ordersSum,
          createdAt: client.createdAt,
          updatedAt: client.updatedAt,
        };
      });

      return res.json({ clients: clientResults });
    } catch (err) {
      console.log(err);
      return next(ApiError.internal("Something went wrong"));
    }
  }

  async getOne(req, res) {
    const { id } = req.params;
    const client = await Client.findOne({ where: { id } });
    return res.json(client);
  }

  async update(req, res) {}

  async delete(req, res) {}
}

module.exports = new ClientController();
