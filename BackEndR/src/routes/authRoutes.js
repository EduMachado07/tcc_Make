const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('../database/connection'); // ajuste para o caminho correto

const router = express.Router();

// // Rota para login
// router.post('/login', (req, res) => {
//     const { email, senha } = req.body;

//     if (!email || !senha) {
//         return res.status(400).json({ error: 'Email e senha são obrigatórios' });
//     }

//     // Buscar o usuário no banco de dados
//     const query = 'SELECT * FROM Usuarios WHERE Email = ?';
//     connection.query(query, [email], (error, results) => {
//         if (error) {
//             return res.status(500).json({ error: 'Erro ao acessar o banco de dados' });
//         }

//         // Verifica se o usuário existe
//         if (results.length === 0) {
//             return res.status(401).json({ error: 'Usuário não encontrado' });
//         }

//         const user = results[0];

//         // Verifica a senha
//         bcrypt.compare(senha, user.Senha, (err, isMatch) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Erro ao verificar a senha' });
//             }

//             if (!isMatch) {
//                 return res.status(401).json({ error: 'Senha incorreta' });
//             }

//             // Se tudo estiver certo, retorna os dados do usuário (ou token)
//             res.status(200).json({ user: { id: user.UsuarioID, email: user.Email } });
//         });
//     });
// });


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


module.exports = router;
