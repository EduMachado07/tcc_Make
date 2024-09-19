const db = require('../config/dbConfig');

// Registro de usuário
exports.register = async (req, res) => {
  const { email, senha, tipoUsuario } = req.body;
  try {
    const [result] = await db.execute('INSERT INTO Usuarios (Email, Senha, TipoUsuario) VALUES (?, ?, ?)', [email, senha, tipoUsuario]);
    res.status(201).send('Usuário registrado com sucesso!');
  } catch (err) {
    res.status(400).send('Erro ao registrar usuário: ' + err.message);
  }
};

// Login de usuário
exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const [rows] = await db.execute('SELECT * FROM Usuarios WHERE Email = ? AND Senha = ?', [email, senha]);
    if (rows.length > 0) {
      res.status(200).send('Login bem-sucedido!');
    } else {
      res.status(401).send('Credenciais inválidas');
    }
  } catch (err) {
    res.status(400).send('Erro ao realizar login: ' + err.message);
  }
};
