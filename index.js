const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/mybooklist')
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Definindo um modelo de exemplo para livros
const livroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  ano: { type: Number },
  genero: { type: String }
});

const Livro = mongoose.model('Livro', livroSchema);

// Rotas
app.get('/', (req, res) => {
    res.send('API de Gerenciamento de Livros');
});

// Rota para listar todos os livros
app.get('/livros', async (req, res) => {
    try {
        const livros = await Livro.find();
        res.json(livros);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar livros', erro: error.message });
    }
});

// Rota para adicionar um novo livro
app.post('/livros', async (req, res) => {
    try {
        const novoLivro = new Livro(req.body);
        const livroSalvo = await novoLivro.save();
        res.status(201).json(livroSalvo);
    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ao adicionar livro', erro: error.message });
    }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});