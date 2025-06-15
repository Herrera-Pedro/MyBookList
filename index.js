const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rota simples
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Rota POST de exemplo
app.post('/dados', (req, res) => {
    const { nome } = req.body;
    res.json({ mensagem: `Olá, ${nome}!` });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});