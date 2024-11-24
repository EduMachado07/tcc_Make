const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../database/connection'); // Supondo que o arquivo database.js está configurado corretamente para conectar ao MySQL

// Função para criar um novo usuário no banco de dados
router.post('/cadastro', async (req, res) => {
  const { email, senha, nome, tel, estado, cidade, bairro, rua, numero, empresa, dataNascimento, user } = req.body;

  try {
    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Criação do usuário no banco de dados
    const [result] = await db.execute(
      'INSERT INTO Usuarios (email, senha, nome, tel, estado, cidade, bairro, rua, numero, empresa, dataNascimento, user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [email, hashedPassword, nome, tel, estado, cidade, bairro, rua, numero, empresa, dataNascimento, user]
    );

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', userId: result.insertId });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ message: 'Erro ao cadastrar usuário', error: error.message });
  }
});

module.exports = router;
