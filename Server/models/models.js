const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "Guest"}
})

const Client = sequelize.define('client', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING, unique: true},
    type: {type: DataTypes.STRING}  //for price changing
})

const Product =sequelize.define('product',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    volume: {type: DataTypes.INTEGER},
    weight: {type: DataTypes.INTEGER},
    country: {type: DataTypes.STRING},
    price: {type: DataTypes.INTEGER, allowNull:false},
    rate: {type: DataTypes.INTEGER, defaultValue:0},
    quantity: {type: DataTypes.INTEGER, defaultValue:0},
    img: {type: DataTypes.STRING},
    code: {type: DataTypes.STRING, unique: true}
})

const ProductInfo = sequelize.define('product_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
})

const Color = sequelize.define('color', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull:false},
})

const Cart = sequelize.define('cart', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    price: {type: DataTypes.INTEGER, defaultValue:0},
})

const OrderProduct = sequelize.define('order_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, defaultValue:1},
    price: {type: DataTypes.INTEGER, defaultValue:1},
})

const CartProduct = sequelize.define('cart_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, defaultValue:1},
    price: {type: DataTypes.INTEGER, defaultValue:1},
})

const CategoryBrand = sequelize.define('category_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

// ProductColor model
const ProductColor = sequelize.define('product_color', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

Client.hasOne(Cart)
Cart.belongsTo(Client)

Client.hasMany(Rating)
Rating.belongsTo(Client)

Cart.hasMany(CartProduct)
CartProduct.belongsTo(Cart)

Cart.hasMany(Order)
Order.belongsTo(Cart)

Order.hasMany(OrderProduct)
OrderProduct.belongsTo(Order)

Category.hasMany(Product)
Product.belongsTo(Category)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Product.hasMany(Rating)
Rating.belongsTo(Product)

Product.hasMany(CartProduct)
CartProduct.belongsTo(Product)

Product.hasMany(OrderProduct)
OrderProduct.belongsTo(Product)

Product.hasMany(ProductInfo, {as:'info'})
ProductInfo.belongsTo(Product)

Category.belongsToMany(Brand, {through: CategoryBrand})
Brand.belongsToMany(Category, {through: CategoryBrand})

// Define relationships
Product.belongsToMany(Color, { through: ProductColor });
Color.belongsToMany(Product, { through: ProductColor });

Product.belongsToMany(CartProduct, {through: 'ProductCart'})
CartProduct.belongsToMany(Product, {through: 'ProductCart'})

//Hayk Stugel
Product.belongsToMany(OrderProduct, {through: 'ProductOrder'})
OrderProduct.belongsToMany(Product, {through: 'ProductOrder'})

module.exports = {
    User,
    Client,
    Product,
    ProductInfo,
    Cart,
    Rating,
    CartProduct,
    Order,
    OrderProduct,
    Category,
    Brand,
    Color,
    CategoryBrand,
    ProductColor
}
