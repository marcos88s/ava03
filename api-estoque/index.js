const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const knexConfig = require('./knexfile').development;
const knex = require('knex')(knexConfig);

//get
app.get('/estoque', async (req, res) => {
  try {
    const cursos = await knex('estoque').select('*');
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos." });
  }
});

// get :id
app.get('/estoque/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const curso = await knex('estoque').where('id', id).first();

    if (!curso) {
      return res.status(404).json({ message: 'produto não encontrado.' });
    }

    res.status(200).json(curso);

  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produto." });
  }
});

// post
app.post('/estoque', async (req, res) => {
  try {
    const { nome, quantidade, preco } = req.body;

    if (!nome || !quantidade || !preco) { // Validação de entrada
      return res.status(400).json({ message: 'Campos "nome", "quantidade" e "preço" são obrigatórios.' });
    }

    const [id] = await knex('estoque').insert({ nome, quantidade, preco });
    res.status(201).json({ id, nome, quantidade, preco });

  } catch (error) {
    res.status(500).json({ message: "Erro ao criar produto." });
  }
});

//delete
app.delete('/estoque/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletado = await knex('estoque').where('id', id).del();

    if (!deletado) {
      return res.status(404).json({ message: 'Produto não encontrado para exclusão.' });
    }

    res.status(204).send();

  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar produto." });
  }
});

//put
app.put('/estoque/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, quantidade, preco } = req.body;

    if (!nome && !quantidade && !preco) { // Validação de entrada
      return res.status(400).json({ message: 'Um campo deve ser fornecido para atualização.' });
    }

    const dadosParaAtualizar = {};
    if (nome) dadosParaAtualizar.nome = nome;
    if (quantidade) dadosParaAtualizar.quantidade = quantidade;
    if (preco) dadosParaAtualizar.preco = preco;

    const atualizado = await knex('estoque').where('id', id).update(dadosParaAtualizar);

    if (!atualizado) {
      return res.status(404).json({ message: 'Produto não encontrado para atualização.' });
    }

    res.status(200).json({ message: "Produto atualizado com sucesso." });

  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar produto." });
  }
});

app.listen(port, () => {
  console.log(`Servidor da API BES rodando em http://localhost:${port}`);
});