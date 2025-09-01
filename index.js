const express = require('express');
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
app.use(express.json());

// Caminho para o arquivo de banco de dados
const DB_FILE = path.join(__dirname, 'db.json');

// Função para ler o banco de dados
const readDatabase = () => {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Erro ao ler o arquivo de banco de dados:', err);
    return [];
  }
};

// Função para escrever no banco de dados
const writeDatabase = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Erro ao escrever no arquivo de banco de dados:', err);
  }
};

// Configuração da documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Retorna a lista de todos os livros
 *     description: Retorna um array com todos os livros armazenados no banco de dados.
 *     responses:
 *       '200':
 *         description: Lista de livros retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   titulo:
 *                     type: string
 *                     example: "O Pequeno Príncipe"
 *                   autor:
 *                     type: string
 *                     example: "Antoine de Saint-Exupéry"
 */

app.get('/livros', (req, res) => {
  const livros = readDatabase();
  res.json(livros);
});

/**
 * @swagger
 * /livros/{id}:
 *   get:
 *     summary: Retorna um livro por ID
 *     description: Retorna um único livro com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do livro a ser retornado.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Livro encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 titulo:
 *                   type: string
 *                   example: "O Pequeno Príncipe"
 *                 autor:
 *                   type: string
 *                   example: "Antoine de Saint-Exupéry"
 *       '404':
 *         description: Livro não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Livro não encontrado"
 */

app.get('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const livros = readDatabase();
  const livro = livros.find(l => l.id === id);

  if (!livro) {
    return res.status(404).json({ mensagem: 'Livro não encontrado' });
  }
  res.json(livro);
});


/**
 * @swagger
 * /livros:
 *   post:
 *     summary: Adiciona um novo livro
 *     description: Adiciona um novo livro à coleção. O ID é gerado automaticamente.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "A Guerra dos Tronos"
 *               autor:
 *                 type: string
 *                 example: "George R. R. Martin"
 *     responses:
 *       '201':
 *         description: Livro adicionado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Livro cadastrado com sucesso"
 *                 livro:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 4
 *                     titulo:
 *                       type: string
 *                       example: "A Guerra dos Tronos"
 *                     autor:
 *                       type: string
 *                       example: "George R. R. Martin"
 *       '400':
 *         description: Título e autor são obrigatórios.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Título e autor são obrigatórios"
 */

app.post('/livros', (req, res) => {
  const livros = readDatabase();
  const novoLivro = {
    id: Date.now(),
    titulo: req.body.titulo,
    autor: req.body.autor
  };

  if (!novoLivro.titulo || !novoLivro.autor) {
    return res.status(400).json({ mensagem: 'Título e autor são obrigatórios' });
  }

  livros.push(novoLivro);
  writeDatabase(livros);
  res.status(201).json({ mensagem: 'Livro cadastrado com sucesso', livro: novoLivro });
});


/**
 * @swagger
 * /livros/{id}:
 *   put:
 *     summary: Atualiza um livro existente
 *     description: Atualiza os dados de um livro com base no ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do livro a ser atualizado.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Dom Casmurro (Edição Especial)"
 *               autor:
 *                 type: string
 *                 example: "Machado de Assis"
 *     responses:
 *       '200':
 *         description: Livro atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Livro atualizado com sucesso"
 *                 livro:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     titulo:
 *                       type: string
 *                       example: "Dom Casmurro (Edição Especial)"
 *                     autor:
 *                       type: string
 *                       example: "Machado de Assis"
 *       '404':
 *         description: Livro não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Livro não encontrado"
 */

app.put('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const livros = readDatabase();
  const livroIndex = livros.findIndex(l => l.id === id);

  if (livroIndex === -1) {
    return res.status(404).json({ mensagem: 'Livro não encontrado' });
  }

  livros[livroIndex].titulo = req.body.titulo || livros[livroIndex].titulo;
  livros[livroIndex].autor = req.body.autor || livros[livroIndex].autor;

  writeDatabase(livros);
  res.json({ mensagem: 'Livro atualizado com sucesso', livro: livros[livroIndex] });
});

/**
 * @swagger
 * /livros/{id}:
 *   delete:
 *     summary: Exclui um livro
 *     description: Exclui um livro com base no ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do livro a ser excluído.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Livro excluído com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Livro excluído com sucesso"
 *       '404':
 *         description: Livro não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Livro não encontrado"
 */

app.delete('/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let livros = readDatabase();
  const initialLength = livros.length;
  livros = livros.filter(l => l.id !== id);

  if (livros.length === initialLength) {
    return res.status(404).json({ mensagem: 'Livro não encontrado' });
  }

  writeDatabase(livros);
  res.json({ mensagem: 'Livro excluído com sucesso' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
  console.log(`Documentação disponível em http://localhost:${PORT}/api-docs`);
});
