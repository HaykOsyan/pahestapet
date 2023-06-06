const { Cart, CartProduct, Product, Client, Category, Brand } = require("../models/models");
const ApiError = require("../error/ApiError");

class CartController {
  async create(req, res) {

  }

  async getAll(req, res) {
    const carts = await Cart.findAll({
      include: {
        model: Client,
        attributes: ["name"],
      },
      attributes: ["id", "createdAt", "updatedAt"],
    });

    // Map the results to only return the desired properties
    const cartResults = carts.map((cart) => ({
      id: cart.id,
      // sum: cart.sum,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
      clientName: cart.dataValues.client.name,
    }));

    return res.json({ carts: cartResults });
  }

  //    for cartProducts   ???? Hayk
  async getOne(req, res) {
    const { id } = req.params;
    const cart = await Cart.findOne({
      where: { id: id },
      include: [
        {
          model: CartProduct,
          include: [
            {
              model: Product,
              include:[
                {
                  model:Category,
                  attributes:["name"]
                },
                {
                  model:Brand,
                  attributes:["name"]
                }
              ]
            }
          ]
        }
      ]
    });
// գուցե ավելի ճիշտ լինի միայն productId փոխանցել UPGRADE
    const sendingData = cart.cart_products.map((cp) => {
      return {
        id:cp.product.id,     //UPGRADE not ProductId for my table component
        productName:cp.product.name,
        quantity:cp.quantity,
        productVolume: cp.product.volume,
        productWeight: cp.product.weight,
        productCountry: cp.product.country,
        productPrice: cp.price,
        productRate: cp.product.rate,
        // productImg: "2fbd2590-4ab3-49bd-b92d-d37657662295.png",  հետո նկարի հարցը UPGRADE
        productCode: cp.product.code,
        category:cp.product.category.name,
        brand:cp.product.brand.name,
        sum:cp.quantity*cp.price
      }
    })

    const cartResult = {
      "id": cart.id,

      // "clientId": cart.clientId,   Հետագայում անունը
    }

    return res.json(sendingData);
  }

  async update(req, res) {
    const { id } = req.params;
    const { quantity } = req.body;
    const cartProduct = await CartProduct.findOne({ where: { id } });
    if (cartProduct) {
      let product = await Product.findOne({
        where: { id: cartProduct.productId },
      });
      if (product.quantity + cartProduct.quantity - quantity >= 0) {
        product = await Product.update(
          { quantity: product.quantity + cartProduct.quantity - quantity },
          { where: { id: cartProduct.productId } }
        );
        await cartProduct.update({ quantity });
        return res.json("Cart product has been successfully updated");
      } else {
        return res.json("No more such product");
      }
    } else {
      throw ApiError.BadRequest("Cart product not found");
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const cartProduct = await CartProduct.findOne({ where: { id } });
    if (cartProduct) {
      const product = await Product.findOne({
        where: { id: cartProduct.productId },
      });
      await product.update({
        quantity: product.quantity + cartProduct.quantity,
      });
      await cartProduct.destroy();
      return res.json("Cart product has been successfully deleted");
    } else {
      throw ApiError.BadRequest("Cart product not found");
    }
  }
}

module.exports = new CartController();
