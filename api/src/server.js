const express = require('express');
const cors = require('cors');
const fs = require('node:fs');
const path = require('node:path');

const app = express();
app.use(cors());
app.use(express.json());
const DATA_FILE = path.join(__dirname, '..', 'produtos.json');
const initial = [
  { id: 1, nome: 'Mouse Gamer', descricao: 'Mouse óptico USB com 6 botões.', preco: 89.9, estoque: 15 },
  { id: 2, nome: 'Teclado Mecânico', descricao: 'Teclado ABNT2 com iluminação.', preco: 249.9, estoque: 8 },
  { id: 3, nome: 'Headset', descricao: 'Fone com microfone e conexão P2.', preco: 129.9, estoque: 12 },
];
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2));
const read = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const save = (items) => fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2));

function validate(body) {
  const nome = typeof body.nome === 'string' ? body.nome.trim() : '';
  const descricao = typeof body.descricao === 'string' ? body.descricao.trim() : '';
  const preco = body.preco;
  const estoque = body.estoque;
  if (!nome) return { error: 'Informe o nome do produto.' };
  if (typeof preco !== 'number' || !Number.isFinite(preco) || preco < 0) return { error: 'Preço deve ser um número maior ou igual a zero.' };
  if (typeof estoque !== 'number' || !Number.isInteger(estoque) || estoque < 0) return { error: 'Estoque deve ser um inteiro maior ou igual a zero.' };
  return { value: { nome, descricao, preco, estoque } };
}
app.get('/produtos', (_req, res) => res.json(read()));
app.get('/produtos/:id', (req, res) => {
  const product = read().find((p) => p.id === Number(req.params.id));
  return product ? res.json(product) : res.status(404).json({ mensagem: 'Produto não encontrado.' });
});
app.post('/produtos', (req, res) => {
  const { error, value } = validate(req.body || {});
  if (error) return res.status(400).json({ mensagem: error });
  const items = read();
  const id = items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  const product = { id, ...value };
  items.push(product);
  save(items);
  return res.status(201).json(product);
});
app.put('/produtos/:id', (req, res) => {
  const items = read();
  const index = items.findIndex((p) => p.id === Number(req.params.id));
  if (index < 0) return res.status(404).json({ mensagem: 'Produto não encontrado.' });
  const { error, value } = validate(req.body || {});
  if (error) return res.status(400).json({ mensagem: error });
  items[index] = { id: items[index].id, ...value };
  save(items);
  return res.json(items[index]);
});
app.delete('/produtos/:id', (req, res) => {
  const items = read();
  const index = items.findIndex((p) => p.id === Number(req.params.id));
  if (index < 0) return res.status(404).json({ mensagem: 'Produto não encontrado.' });
  items.splice(index, 1);
  save(items);
  return res.status(204).send();
});
app.use((error, _req, res, _next) => {
  if (error instanceof SyntaxError && error.status === 400) return res.status(400).json({ mensagem: 'JSON inválido.' });
  console.error(error);
  return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
});
if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  app.listen(port, '0.0.0.0', () => console.log(`API disponível em http://localhost:${port}`));
}
module.exports = app;