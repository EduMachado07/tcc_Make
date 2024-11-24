const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const loginRouter = require('./routes/login'); // Ajuste para o caminho correto
const cadastroRouter = require('./routes/cadastro'); // Ajuste para o caminho correto
const authRouter = require('./routes/authRoutes'); // Ajuste para o caminho correto

const app = express();
const PORT = 3000; // Ou a nova porta que você configurou

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Rotas
app.use('/api/login', loginRouter);
app.use('/api/cadastro', cadastroRouter);
app.use('/api/auth', authRouter);

// Rota de teste
app.get('/api/test', (req, res) => {
    res.send('API está funcionando!');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
