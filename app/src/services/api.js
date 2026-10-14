// Troque pelo IPv4 do computador executando a API na mesma rede Wi-Fi.
// Emulador Android: http://10.0.2.2:3000 | simulador iOS: http://localhost:3000
export const BASE_URL = 'http://192.168.1.100:3000';
async function request(route, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(BASE_URL + route, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
      signal: controller.signal,
    });
    if (response.status === 204) return null;
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.mensagem || 'Erro HTTP ' + response.status);
    return result;
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('A conexão demorou demais. Confira o endereço da API.');
    if (error instanceof TypeError) throw new Error('Não foi possível conectar à API. Verifique o IP e se o servidor está ligado.');
    throw error;
  } finally {
    clearTimeout(timer);
  }
}
export const listarProdutos = () => request('/produtos');
export const buscarProduto = (id) => request('/produtos/' + id);
export const cadastrarProduto = (data) => request('/produtos', { method: 'POST', body: JSON.stringify(data) });
export const atualizarProduto = (id, data) => request('/produtos/' + id, { method: 'PUT', body: JSON.stringify(data) });
export const excluirProduto = (id) => request('/produtos/' + id, { method: 'DELETE' });