const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // Se estiver usando bcrypt para hashing de senhas
const jwt = require('jsonwebtoken'); // Se estiver usando JWT para autenticação
const pool = require('../../database/connection'); // Caminho correto para o pool

// Rota para login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Buscar o usuário no banco de dados
        const [user] = await pool.query('SELECT * FROM Usuarios WHERE Email = ?', [email]);

        if (user.length === 0) {
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }

        // Verificar a senha
        const validPassword = await bcrypt.compare(senha, user[0].Senha);
        if (!validPassword) {
            return res.status(401).json({ error: 'Email ou senha incorretos' });
        }

        // Gerar token JWT
        const token = jwt.sign({ id: user[0].UsuarioID, tipo: user[0].TipoUsuario }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ token, user: user[0] });
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor' });
    }
});

module.exports = router;
