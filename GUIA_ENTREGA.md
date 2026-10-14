# Guia de execução e entrega

## 1. Requisitos
- Node.js LTS, npm e Expo Go no celular ou emulador Android.
- API e celular no mesmo Wi-Fi, quando usar dispositivo físico.

## 2. Iniciar API
Abra terminal na pasta `api`:
```bash
npm install
npm run dev
```
Confira `http://localhost:3000/produtos` no navegador do computador. A API inclui rotas GET /produtos, GET /produtos/:id, POST /produtos, PUT /produtos/:id e DELETE /produtos/:id.

## 3. Configurar app
Descubra o IPv4 do computador executando `ipconfig` no Windows. Edite `app/src/services/api.js` e substitua `http://192.168.1.100:3000` pelo endereço `http://SEU-IP:3000`. O IP 192.168.1.100 é apenas EXEMPLO.
- Android Emulator: `http://10.0.2.2:3000`
- Simulador iOS: `http://localhost:3000`
- Celular físico: IPv4 real da máquina; libere a porta 3000 no firewall se necessário.

## 4. Iniciar aplicativo
Abra um segundo terminal na pasta `app`:
```bash
npm install
npx expo install --fix
npx expo start
```
Abra o app pelo Expo Go e QR Code. Não feche o terminal da API.

## 5. Gravação do vídeo 1 — demonstração
1. Mostrar lista de produtos e loading.
2. Abrir detalhes de um produto.
3. Criar produto de teste: `Caderno`, descrição `200 folhas`, preço `19,90`, estoque `5`.
4. Conferir que produto aparece na lista.
5. Editar preço para `24,90`; confirmar na lista/detalhes.
6. Excluir o produto; confirmar remoção.
7. Opcional: desligar API, recarregar e mostrar mensagem de erro; religar e tentar novamente.

## 6. Gravação do vídeo 2 — explicação do código
1. Mostrar raiz com `api/` e `app/`.
2. Explicar `api/src/server.js`: Express, validação e rotas CRUD.
3. Explicar `app/src/services/api.js`: funções de cada verbo HTTP e mensagens de erro.
4. Explicar `app/src/navigation/AppNavigator.js`: rotas e navegação.
5. Explicar `ProductListScreen.js`: FlatList e consulta GET.
6. Explicar `ProductDetailsScreen.js`: GET por ID e DELETE.
7. Explicar `ProductFormScreen.js`: POST e PUT.
8. Explicar componentes de loading, erro, card e botão.

## 7. Checklist antes da entrega
- [ ] Aplicativo inicia no dispositivo/emulador
- [ ] API responde no dispositivo e no navegador
- [ ] Cadastro, listagem, detalhes, edição e exclusão testados
- [ ] Vídeo da demonstração gravado
- [ ] Vídeo da explicação gravado
- [ ] Link deste GitHub e dos dois vídeos enviados ao professor

OBS: os vídeos devem ser gravados de uma execução real do projeto. Os testes no celular e as gravações não são feitos automaticamente pelo GitHub.
