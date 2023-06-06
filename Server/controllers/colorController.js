const { Color } = require('../models/models');

class ColorController {

    async create (req, res) {
        try {
            const { name } = req.body;
            const existingColor = await Color.findOne({where:{ name }});
            if (existingColor) {
                return res.status(400).json({ message: 'Color already exists' });
            }
            const color = await Color.create({ name });
            res.status(201).json({ color });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    }
    

    async getAll (req, res) {
        try {
            const colors = await Color.findAll();
            res.status(200).json({ colors });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    }

    async getOne (req, res) {
        try {
            const { id } = req.params;
            const color = await Color.findByPk(id);
            if (!color) {
                return res.status(404).json({ message: 'Color not found' });
            }
            res.status(200).json({ color });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    }

    async update (req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const color = await Color.findByPk(id);
            if (!color) {
                return res.status(404).json({ message: 'Color not found' });
            }
            await color.update({ name });
            res.status(200).json({ color });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    }

    async delete (req, res) {
        try {
            const { id } = req.params;
            const color = await Color.findByPk(id);
            if (!color) {
                return res.status(404).json({ message: 'Color not found' });
            }
            await color.destroy();
            res.status(204).json({});
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    }
}

module.exports = new ColorController();
