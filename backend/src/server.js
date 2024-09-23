const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Importar e usar rotas
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Rota básica
app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
