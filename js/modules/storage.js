const DB_KEY = 'nexus_voluntarios_db';

export function getVoluntarios() {
  try {
    const dados = localStorage.getItem(DB_KEY);
    return dados ? JSON.parse(dados) : [];
  } catch (erro) {
    console.error('Erro ao ler do localStorage:', erro);
    return [];
  }
}

export function saveVoluntario(voluntario) {
  try {
    const lista = getVoluntarios();
    lista.push({
      ...voluntario,
      id: Date.now(),
      dataCadastro: new Date().toLocaleDateString('pt-BR')
    });
    localStorage.setItem(DB_KEY, JSON.stringify(lista));
    return true;
  } catch (erro) {
    console.error('Erro ao salvar no localStorage:', erro);
    return false;
  }
}
