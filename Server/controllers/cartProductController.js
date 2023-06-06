const { Cart, CartProduct, Product, Client } = require("../models/models");
const ApiError = require("../error/ApiError");

class CartProductController {

  async getAll(req, res, next) {
    try {
      const cartProducts = await CartProduct.findAll({
        include: [
          {
            model: Product,
            attributes: ['name']
          },
          {
            model: Cart,
            attributes: ["id"],
            include: [
              {
                model: Client,
                attributes: ["name"]
              }
            ]
          }
        ]
      });

      const cartProductResults = cartProducts.map((cartProduct) => {

        return {
          id: cartProduct.id,
          quantity: cartProduct.quantity,
          price: cartProduct.price,
          createdAt: cartProduct.createdAt,
          updatedAt: cartProduct.updatedAt,
          cartId: cartProduct.cartId,
          productName: cartProduct.product.name,
          clientName: cartProduct.cart.client.name
        }

      })

      return res.json(cartProductResults);
    } catch (err) {
      console.log(err);
      return next(ApiError.internal("Something went wrong"));
    }
  }

  async getByCartId(req, res, next) {
    const cartId = req.params.cart_id; // assuming the cartId is passed as a parameter
    try {
      const cartProducts = await CartProduct.findAll({
        where: {
          cartId: cartId
        },
        include: [
          {
            model: Product,
            attributes: ['name']
          },
          {
            model: Cart,
            attributes: ["id"],
            include: [
              {
                model: Client,
                attributes: ["name"]
              }
            ]
          }
        ]
      });

      const cartProductResults = cartProducts.map((cartProduct) => {
        return {
          id: cartProduct.id,
          quantity: cartProduct.quantity,
          createdAt: cartProduct.createdAt,
          updatedAt: cartProduct.updatedAt,
          cartId: cartProduct.cartId,
          productName: cartProduct.product.name,
          clientName: cartProduct.cart.client.name
        }
      });

      return res.json(cartProductResults);
    } catch (err) {
      console.log(err);
      return next(ApiError.internal("Something went wrong"));
    }
  }


  async create(req, res, next) {
    let updatedRows;
    try {
      const { cartId, productIds, quantities, prices } = req.body;
      const cart = await Cart.findOne({ where: { id: cartId } });
      let product;
      for (let i = 0; i < productIds.length; i++) {
        const productId = productIds[i];
        const quantity = quantities[i];
        const price = prices[i];
        // getting product from product Table
        product = await Product.findOne({ where: { id: productId } });
        console.log(product.quantity - quantity)
        //checking if there is much product
        if (product.quantity - quantity >= 0) {
          const choosedProduct = await CartProduct.findOne({
            where: { cartId: cartId, productId: productId },
          });

          // check if there is such product in cart
          if (choosedProduct) {
            const addedProduct = await CartProduct.update(
              // { quantity: choosedProduct.quantity + quantity },
              { quantity: parseInt(choosedProduct.quantity) + parseInt(quantity) },

              { where: { cartId: cartId, productId: productId } },
            );
          } else {
            const cartProduct = await CartProduct.create({
              cartId,
              productId,
              quantity,
              price
            });
          }
          // setting quantity of product new value in product Table
          const updatedProduct = await Product.update(
            { quantity: product.quantity - quantity },
            { where: { id: productId } }
          );
          // updated qanak
          if (updatedProduct[0] > 0) {
            updatedRows = await Product.findByPk(productId);
          } else {
            // Handle the case when the update operation did not affect any rows
            console.log("No rows were updated");
          }
        } else {
          return next(ApiError.badRequest("Not enough products in stock"));
        }
      }
      // sending to frontend quantity of mnacac (updated) products
      return res.json(updatedRows.quantity);
    } catch (err) {
      console.log(err);
      return next(ApiError.internal("Something went wrong"));
    }
  }

}

module.exports = new CartProductController();
