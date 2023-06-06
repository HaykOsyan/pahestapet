const {OrderProduct, Order, CartProduct, Product} = require('../models/models')
const ApiError = require('../error/ApiError')

class OrderController {

    async create (req,res) {
        const {cartId, productIds, quantities, prices} = req.body
        const order = await Order.create({cartId})
    
        for(let i=0; i<productIds.length; i++) {
            const productId = productIds[i]
            const quantity = quantities[i]
            const price = prices[i]
    
            let cartProduct = await CartProduct.findOne({where:{productId:productId}})
    
            if(cartProduct.quantity-quantity >= 0){
                cartProduct = await CartProduct.update({quantity:cartProduct.quantity-quantity},
                                                {where:{productId:productId}})
    
                const orderProduct = await OrderProduct.create({orderId:order.id,productId,quantity,price})
            }
            else{
                return res.json('No more such product')
            }
        }
    
        return res.json('Products have been successfully added to the ORDER')
    }
   
    async getAll (req,res) {

        try {
            const orders = await Order.findAll({
                include: {
                  model: OrderProduct,
                  attributes: ["quantity", "price"],
                  include:{
                    model:Product,
                    attributes:["price","id"]
                  }
                },
                attributes: ["id", "createdAt", "updatedAt"],
              });

        
          const orderResults = orders.map((order) => {
                const orderProducts = order.dataValues.order_products;
                console.log(orderProducts)
                const orderSum = orderProducts.reduce((sum,orderProduct) => {
                    return sum + orderProduct.dataValues.quantity * orderProduct.dataValues.price
                },0)
                return {
                  id: order.id,
                  createdAt: order.createdAt,
                  updatedAt: order.updatedAt,
                  orderSum,
                };
              });
          
              return res.json({ orders: orderResults });
            
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }

    }

    async getOne (req,res) {
        const {id} = req.params
        const order = await Order.findOne({
            where:{id},
            include:{
                model:OrderProduct,
                attributes:['quantity', 'price', 'createdAt', 'updatedAt'],
                include:{
                    model:Product,
                    attributes:['name'],
                    include:{
                        model:CartProduct,
                        // attributes:['']
                    }
                }
            }
        })
        if(order){
            const orderProducts = order.dataValues.order_products.map((orderProduct) => ({
                productName: orderProduct.dataValues.product.name,
                productPrice: orderProduct.price,
                quantity: orderProduct.dataValues.quantity,
                createdAt: orderProduct.createdAt,
                updatedAt: orderProduct.updatedAt,
            }))
            return res.json(orderProducts)
        }
        else{
            throw ApiError.BadRequest('Order product not found')
        }
    }

    async update (req,res) {
        const {id} = req.params
        const {quantity} = req.body
        const orderProduct = await OrderProduct.findOne({where:{id}})
        if(orderProduct){
            let cartProduct = await CartProduct.findOne({where:{productId:orderProduct.productId}})
            if(cartProduct.quantity+orderProduct.quantity-quantity >= 0){
                cartProduct = await CartProduct.update({quantity:cartProduct.quantity+orderProduct.quantity-quantity},
                                                {where:{productId:orderProduct.productId}})
                await orderProduct.update({quantity})
                return res.json('Order product has been successfully updated')
            }
            else{
                return res.json('No more such product')
            }
        }
        else{
            throw ApiError.BadRequest('Order product not found')
        }
    }

    async delete (req,res) {
        const {id} = req.params
        const orderProduct = await OrderProduct.findOne({where:{id}})
        if(orderProduct){
            let cartProduct = await CartProduct.findOne({where:{productId:orderProduct.productId}})
            cartProduct = await CartProduct.update({quantity:cartProduct.quantity+orderProduct.quantity},
                                                {where:{productId:orderProduct.productId}})
            await orderProduct.destroy()
            return res.json('Order product has been successfully deleted')
        }
        else{
            throw ApiError.BadRequest('Order product not found')
        }
    }
}

module.exports = new OrderController()