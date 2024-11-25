const express = require('express');
const router = express.Router();
const db = require('../database/connection'); // Assumindo que sua conexão está neste arquivo

// Rota para cadastro de clientes
router.post('/clientes', async (req, res) => {
  const { nome, endereco, telefone, dataNascimento } = req.body;

  try {
    const query = 'INSERT INTO clientes (nome, endereco, telefone, dataNascimento) VALUES (?, ?, ?, ?)';
    const results = await db.query(query, [nome, endereco, telefone, dataNascimento]);

    res.json({ id: results.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar cliente', error });
  }
});

// Rota para cadastro de empresas
router.post('/empresas', async (req, res) => {
  const { nome, empresa, endereco, telefone } = req.body;

  try {
    const query = 'INSERT INTO empresas (nome, empresa, endereco, telefone) VALUES (?, ?, ?, ?)';
    const results = await db.query(query, [nome, empresa, endereco, telefone]);

    res.json({ id: results.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar empresa', error });
  }
});

// Rota para cadastro de usuários
router.post('/usuarios', async (req, res) => {
  const { email, senha, tipoUsuario, idCliente, idEmpresa } = req.body;

  try {
    const query = 'INSERT INTO usuarios (email, senha, tipoUsuario, idCliente, idEmpresa) VALUES (?, ?, ?, ?, ?)';
    const results = await db.query(query, [email, senha, tipoUsuario, idCliente, idEmpresa]);

    res.json({ id: results.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar usuário', error });
  }
});

// Rota para login
router.post('api/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
    const results = await db.query(query, [email, senha]);

    if (results.length === 0) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    res.json(results[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error });
  }
});

module.exports = router;
