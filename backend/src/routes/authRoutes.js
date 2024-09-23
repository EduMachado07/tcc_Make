// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../../database/connection'); // Atualize para o caminho correto

// Rota para login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    console.log('Requisição recebida:', { email, senha });

    try {
        // Buscar o usuário no banco de dados
        const [user] = await pool.query('SELECT * FROM Usuarios WHERE Email = ?', [email]);
        console.log('Usuário encontrado:', user);

        if (user.length === 0) {
            console.log('Email incorreto');
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }

        // Verificar a senha
        const validPassword = await bcrypt.compare(senha, user[0].Senha);
        console.log('Senha válida:', validPassword);

        if (!validPassword) {
            console.log('Senha incorreta');
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }

        // Gerar token JWT
        const token = jwt.sign({ id: user[0].UsuarioID, tipo: user[0].TipoUsuario }, 'your_jwt_secret', { expiresIn: '1h' });
        console.log('Token gerado:', token);

        res.json({ token, user: user[0] });
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

module.exports = router;
