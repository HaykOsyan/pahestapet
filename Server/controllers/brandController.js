const { Brand } = require('../models/models');
const ApiError = require('../error/ApiError')

class BrandController {

    async create (req,res) {
        try {
            const { name } = req.body;
            const existingBrand = await Brand.findOne({where:{ name }});
            if (existingBrand) {
                throw new ApiError(`Brand with name '${name}' already exists`, 400);
            }
            const brand = await Brand.create({ name });
            res.status(201).json({ brand });
        } catch (err) {
            console.error(err);
            if (err instanceof ApiError) {
                res.status(err.status).json({ message: err.message });
            } else {
                res.status(500).json({ message: 'Server Error' });
            }
        }
    }

    async getAll (req,res) {
        try {
            const brands = await Brand.findAll();
            res.status(200).json({ brands });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    }

    async getOne (req,res) {
        try {
            const { id } = req.params;
            const brand = await Brand.findByPk(id);
            if (!brand) {
                return res.status(404).json({ message: 'Brand not found' });
            }
            res.status(200).json({ brand });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    }

    async update (req,res) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const brand = await Brand.findByPk(id);
            if (!brand) {
                return res.status(404).json({ message: 'Brand not found' });
            }
            await brand.update({ name });
            res.status(200).json({ brand });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    }

    async delete (req,res) {
        try {
            const { id } = req.params;
            const brand = await Brand.findByPk(id);
            if (!brand) {
                return res.status(404).json({ message: 'Brand not found' });
            }
            await brand.destroy();
            res.status(204).json({});
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    }
}

module.exports = new BrandController();
