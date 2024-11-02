const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configurando a conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // substitua pelo seu usuário do MySQL
  password: '', // substitua pela sua senha do MySQL
  database: 'SGME_HUBFLOW',
});

// Conexão com o banco de dados
db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL!');
});

// Rota de login
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;

  // Consulta SQL para verificar se o usuário existe
  const sql = 'SELECT * FROM Usuarios WHERE Email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).send(err);

    // Verifica se o usuário foi encontrado
    if (results.length > 0) {
      const user = results[0];

      // Aqui você deve comparar a senha armazenada (normalmente, você deve usar bcrypt para hashing)
      if (user.Senha === senha) {
        return res.json({ user: { UsuarioID: user.UsuarioID, Email: user.Email, TipoUsuario: user.TipoUsuario } });
      } else {
        return res.status(401).json({ message: 'Senha incorreta' });
      }
    } else {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
