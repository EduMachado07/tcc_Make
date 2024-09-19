const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt'); // Para hashing de senhas
const jwt = require('jsonwebtoken'); // Para geração de tokens JWT

// Criação da pool de conexões
const pool = mysql.createPool({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'SGME_HUBFLOW',
});

// Função para buscar usuário por e-mail
async function findUserByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM Usuarios WHERE Email = ?', [email]);
  return rows[0]; // Retorna o primeiro usuário encontrado
}

// Função para criar um novo usuário
async function createUser(email, senha, tipoUsuario) {
  // Hash da senha antes de armazenar
  const hashedPassword = await bcrypt.hash(senha, 10);
  const [result] = await pool.query(
    'INSERT INTO Usuarios (Email, Senha, TipoUsuario) VALUES (?, ?, ?)',
    [email, hashedPassword, tipoUsuario]
  );
  return result.insertId; // Retorna o ID do usuário recém-criado
}

// Função para verificar a senha do usuário
async function verifyUserPassword(email, senha) {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }
  const isMatch = await bcrypt.compare(senha, user.Senha);
  if (!isMatch) {
    throw new Error('Senha incorreta');
  }
  return user;
}

// Função para gerar um token JWT
function generateToken(user) {
  return jwt.sign({ id: user.UsuarioID, tipo: user.TipoUsuario }, 'your_jwt_secret', { expiresIn: '1h' });
}

module.exports = {
  findUserByEmail,
  createUser,
  verifyUserPassword,
  generateToken,
};
