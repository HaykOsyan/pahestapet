const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const { User } = require('../models/models')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {

    async registration(req, res) {
        await body('email').isEmail().normalizeEmail().run(req);
        await body('password').isLength({ min: 6 }).run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, role } = req.body;
        const existingUser = await User.findOne({ where: {email} });
        if (existingUser) {
            return res.status(400).json({ errors: [{ msg: 'Email already exists' }] });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, role, password: hashedPassword });
        const token = generateJwt(user.id, user.email, user.role);
        return res.json(token);
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            next(ApiError.internal('no user with such email hey You'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            next(ApiError.internal('wrong e pass'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json(token)
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json(token)
    }
}

module.exports = new UserController()