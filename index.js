const express = require('express');
const app = express();
app.use(express.json());

let livros = [
  { id: 1, titulo: 'O Pequeno Príncipe', autor: 'Antoine de Saint-Exupéry' },
  { id: 2, titulo: 'Dom Casmurro', autor: 'Machado de Assis' }
];

// ROTA GET → Listar todos os livros
app.get('/livros', (req, res) => {
  res.json(livros);
});

// ROTA POST → Adicionar um novo livro
app.post('/livros', (req, res) => {
  const novoLivro = {
    id: Date.now(),
    titulo: req.body.titulo,
    autor: req.body.autor
  };
  livros.push(novoLivro);
  res.status(201).json({ mensagem: 'Livro cadastrado com sucesso', livro: novoLivro });
});

// ROTA PUT → Atualizar dados de um livro existente
app.put('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const livroIndex = livros.findIndex(l => l.id === id);

  if (livroIndex === -1) {
    return res.status(404).json({ mensagem: 'Livro não encontrado' });
  }

  livros[livroIndex].titulo = req.body.titulo || livros[livroIndex].titulo;
  livros[livroIndex].autor = req.body.autor || livros[livroIndex].autor;

  res.json({ mensagem: 'Livro atualizado com sucesso', livro: livros[livroIndex] });
});

app.listen(3000, () => {
  console.log('API rodando na porta 3000');
});
