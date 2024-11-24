const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../database/connection'); // Ajuste para o caminho correto

const router = express.Router();

// Rota de teste
router.get('/', (req, res) => {
    res.send('Login foi!');
});

// Rota de login
router.get('/login', async (req, res) => { // Alterado de GET para POST
    const { email, senha } = req.body;
    console.log("teste")

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        const sql = 'SELECT * FROM Usuarios WHERE Email = ?';
        db.query(sql, [email], async (err, results) => {
            if (err) return res.status(500).send({ message: 'Erro ao acessar o banco de dados.', error: err });

            if (results.length > 0) {
                const user = results[0];
                const isMatch = await bcrypt.compare(senha, user.Senha);
                if (isMatch) {
                    return res.json({
                        user: {
                            UsuarioID: user.UsuarioID,
                            Email: user.Email,
                            TipoUsuario: user.TipoUsuario
                        }
                    });
                } else {
                    return res.status(401).json({ message: 'Senha incorreta' });
                }
            } else {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
        });
    } catch (err) {
        console.error('Erro ao realizar login:', err);
        return res.status(500).json({ message: 'Erro ao tentar fazer login', error: err });
    }
});

module.exports = router;
