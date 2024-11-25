const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const loginRouter = require('./routes/Login'); // Ajuste para o caminho correto
const authRouter = require('./routes/Routes'); // Ajuste para o caminho correto
const cadastroRouter = require('./routes/cadastro');

const app = express();
const PORT = process.env.PORT || 3001; // Ou a nova porta que você configurou

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173', // URL do seu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));


// Rotas
app.use('/api/login', loginRouter);
app.use('/api/auth', authRouter);
app.use('/api', cadastroRouter); 

// Tratamento de erros 404
app.use((req, res) => {
    res.status(404).json({ message: `Rota ${req.url} não encontrada` });
  });

// Tratamento de erros gerais
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Erro interno do servidor' });
  });

// Rota de teste
app.get('/api/test', (req, res) => {
    res.send('API está funcionando!');
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
