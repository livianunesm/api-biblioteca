API de Gerenciamento de Livros
Esta é uma API RESTful simples para gerenciar uma coleção de livros, utilizando Express.js e um arquivo JSON como banco de dados. O projeto foi desenvolvido com foco em demonstrar os principais métodos HTTP (GET, POST, PUT, DELETE) e a documentação com Swagger.

Pré-requisitos
Certifique-se de ter o Node.js instalado em seu sistema.

Instalação e Execução
Siga os passos abaixo para testar a API localmente:

Clone o repositório (caso esteja em um, se não, crie os arquivos na sua máquina).

Navegue até o diretório do projeto no terminal.

Instale as dependências listadas no package.json:

npm install

Inicie o servidor com o seguinte comando:

npm start

Você verá a mensagem API rodando na porta 3000 e a URL da documentação no seu terminal.

Documentação da API
A documentação completa da API, gerada com Swagger, está disponível em:
http://localhost:3000/api-docs

Acesse este link no seu navegador para explorar todas as rotas de forma interativa.

Rotas da API
Método

Rota

Descrição

GET

/livros

Retorna a lista completa de livros.

GET

/livros/:id

Retorna um livro específico por ID.

POST

/livros

Adiciona um novo livro.

PUT

/livros/:id

Atualiza os dados de um livro existente.

DELETE

/livros/:id

Exclui um livro por ID.

Exemplos de Requisição e Resposta
Você pode usar ferramentas como curl, Postman ou Insomnia para testar as rotas.

GET /livros
Requisição:

curl http://localhost:3000/livros

Resposta:

[
  {
    "id": 1,
    "titulo": "O Pequeno Príncipe",
    "autor": "Antoine de Saint-Exupéry"
  },
  {
    "id": 2,
    "titulo": "Dom Casmurro",
    "autor": "Machado de Assis"
  }
]

POST /livros
Requisição:

curl -X POST http://localhost:3000/livros \
-H "Content-Type: application/json" \
-d '{"titulo": "A Guerra dos Tronos", "autor": "George R. R. Martin"}'

Resposta:

{
  "mensagem": "Livro cadastrado com sucesso",
  "livro": {
    "id": 1678885689045,
    "titulo": "A Guerra dos Tronos",
    "autor": "George R. R. Martin"
  }
}

PUT /livros/:id (exemplo com o ID 2)
Requisição:

curl -X PUT http://localhost:3000/livros/2 \
-H "Content-Type: application/json" \
-d '{"titulo": "Dom Casmurro (Edição Especial)"}'

Resposta:

{
  "mensagem": "Livro atualizado com sucesso",
  "livro": {
    "id": 2,
    "titulo": "Dom Casmurro (Edição Especial)",
    "autor": "Machado de Assis"
  }
}

DELETE /livros/:id (exemplo com o ID 1)
Requisição:

curl -X DELETE http://localhost:3000/livros/1

Resposta:

{
  "mensagem": "Livro excluído com sucesso"
}


O contexto que visamos a construção do API é o Gerenciamento de Biblioteca Digital:
 Uma biblioteca comunitária ou escolar poderia utilizar a API para catalogar seus livros. Cada rota permitiria que os bibliotecários adicionassem novos títulos, atualizassem informações (como a data de devolução), e mantivessem um inventário digital organizado, facilitando a consulta por parte dos usuários.
