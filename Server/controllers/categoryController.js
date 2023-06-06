const {Category} = require('../models/models')
const ApiError = require('../error/ApiError')

class CategoryController {

    async create (req, res) {
        try {
            const { name } = req.body;
            const existingCategory = await Category.findOne({where :{ name }});
            if (existingCategory) {
                return res.status(400).json({ message: 'Category already exists' });
            }
            const category = await Category.create({ name });
            res.status(201).json({ category });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    }
    

    async getAll (req,res) {
        const categories = await Category.findAll()
        return res.json({categories})
    }

    async getOne (req,res) {
        const {id} = req.params
        const category = await Category.findOne({where:{id}})
        return res.json(category)
    }

    async update (req,res) {
        
    }

    async delete (req,res) {
        
    }
}

module.exports = new CategoryController()