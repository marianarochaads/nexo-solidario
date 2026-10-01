import { templateHome, templateProjetos, templateCadastro, templateTransparencia } from './templates.js';
import { setupFormCadastro } from './formHandler.js';

const rotas = {
  '': templateHome,
  '#home': templateHome,
  '#projetos': templateProjetos,
  '#cadastro': templateCadastro,
  '#transparencia': templateTransparencia
};

export function navegar() {
  const hash = window.location.hash || '#home';
  const renderView = rotas[hash] || templateHome;
  const appRoot = document.getElementById('app-root');

  if (appRoot) {
    appRoot.innerHTML = renderView();

    if (hash === '#cadastro') {
      setupFormCadastro();
    }
  }

  // Atualiza classe visual no menu
  const links = document.querySelectorAll('.nav__link');
  links.forEach((link) => {
    link.classList.remove('is-active');
    if (link.getAttribute('href') === hash) {
      link.classList.add('is-active');
    }
  });
}

export function initRouter() {
  window.addEventListener('hashchange', navegar);
  window.addEventListener('DOMContentLoaded', navegar);
}
