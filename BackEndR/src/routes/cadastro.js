const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../database/connection');

router.post('/cadastro', async (req, res) => {
  const { 
    email, 
    senha, 
    nome, 
    tel, 
    estado, 
    cidade, 
    bairro, 
    rua, 
    numero,
    empresa: nomeEmpresa,
    dataNascimento,
    user: tipoUsuario 
  } = req.body;

  console.log('Dados recebidos:', {
    email, nome, tel, estado, cidade, bairro, rua, numero,
    nomeEmpresa, dataNascimento, tipoUsuario
  });

  const endereco = `${rua}, ${numero}, ${bairro}, ${cidade}, ${estado}`;
  
  try {
    // Verificar conexão com o banco
    const connection = await db.getConnection();
    console.log('Conexão com o banco estabelecida');

    await connection.beginTransaction();
    console.log('Transação iniciada');

    try {
      // Verificar se o email já existe
      const [existingUsers] = await connection.execute(
        'SELECT Email FROM Usuarios WHERE Email = ?',
        [email]
      );

      if (existingUsers.length > 0) {
        await connection.rollback();
        return res.status(400).json({ 
          message: 'Email já cadastrado' 
        });
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(senha, 10);
      console.log('Senha criptografada');
      
      // Criar usuário
      const [userResult] = await connection.execute(
        'INSERT INTO Usuarios (Email, Senha, TipoUsuario) VALUES (?, ?, ?)',
        [email, hashedPassword, tipoUsuario === 'cliente' ? 'Cliente' : 'Empresa']
      );
      console.log('Usuário criado:', userResult.insertId);
      
      const usuarioId = userResult.insertId;

      if (tipoUsuario === 'cliente') {
        console.log('Criando cliente...');
        const [clientResult] = await connection.execute(
          'INSERT INTO Clientes (Nome, Endereco, Telefone, Email, DataNascimento, UsuarioID) VALUES (?, ?, ?, ?, ?, ?)',
          [nome, endereco, tel, email, dataNascimento || null, usuarioId]
        );

        await connection.execute(
          'UPDATE Usuarios SET ClienteID = ? WHERE UsuarioID = ?',
          [clientResult.insertId, usuarioId]
        );

        await connection.commit();
        console.log('Cliente criado com sucesso');
        
        return res.status(201).json({
          message: 'Cliente cadastrado com sucesso',
          userId: usuarioId,
          clienteId: clientResult.insertId
        });
        
      } else if (tipoUsuario === 'empresa') {
        console.log('Criando empresa...');
        const [empresaResult] = await connection.execute(
          'INSERT INTO Empresa (NomeEmpresa, NomeDono, Email, Telefone, Endereco) VALUES (?, ?, ?, ?, ?)',
          [nomeEmpresa, nome, email, tel, endereco]
        );
        
        const [funcResult] = await connection.execute(
          'INSERT INTO Funcionarios (Nome, Cargo, EmpresaID, UsuarioID) VALUES (?, ?, ?, ?)',
          [nome, 'Dono', empresaResult.insertId, usuarioId]
        );

        await connection.execute(
          'UPDATE Usuarios SET FuncionarioID = ? WHERE UsuarioID = ?',
          [funcResult.insertId, usuarioId]
        );

        await connection.commit();
        console.log('Empresa criada com sucesso');

        return res.status(201).json({
          message: 'Empresa cadastrada com sucesso',
          userId: usuarioId,
          empresaId: empresaResult.insertId,
          funcionarioId: funcResult.insertId
        });
      }

    } catch (error) {
      console.error('Erro durante a transação:', error);
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Erro detalhado:', error);
    res.status(500).json({ 
      message: 'Erro ao realizar cadastro', 
      error: error.message,
      stack: error.stack 
    });
  }
});

module.exports = router;