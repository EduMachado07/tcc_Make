// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Verifica a senha e obtém o usuário
        const user = await userModel.verifyUserPassword(email, senha);

        // Gera um token JWT
        const token = userModel.generateToken(user);

        res.json({ token, user });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

module.exports = router;
