import { getVoluntarios } from './storage.js';

// Funções de proteção de dados sensíveis (LGPD)
function ocultarCPF(cpf) {
  if (!cpf || cpf.length < 14) return '***.***.***-**';
  // Exibe apenas os dígitos centrais: ***.283.415-**
  return '***.' + cpf.substring(4, 11) + '-**';
}

function ocultarTelefone(tel) {
  if (!tel || tel.length < 14) return '(**) *****-****';
  // Exibe DDD e final: (11) 9****-1590
  return tel.substring(0, 6) + '****-' + tel.slice(-4);
}

function ocultarEmail(email) {
  if (!email || !email.includes('@')) return '***@***.com';
  const partes = email.split('@');
  const nomeUsuario = partes[0];
  const dominio = partes[1];
  const inicial = nomeUsuario.charAt(0);
  const final = nomeUsuario.slice(-1);
  return inicial + '***' + final + '@' + dominio;
}

// Tela 1: Início
export function templateHome() {
  return `
    <section class="hero">
      <h1 class="page-title">Conectando Voluntários a Causas Reais</h1>
      <p class="page-subtitle">Transforme a realidade de comunidades por meio do engajamento social ativo e colaborativo.</p>
      <a href="#cadastro" class="btn btn--primary">Quero Ser Voluntário</a>
    </section>
  `;
}

// Tela 2: Projetos
export function templateProjetos() {
  return `
    <section>
      <h1 class="page-title">Projetos Ativos</h1>
      <p class="page-subtitle">Conheça as iniciativas da nossa comunidade e participe.</p>
      <div class="cards-grid">
        <article class="card">
          <h2 class="card__title">Reflorestamento Urbano</h2>
          <p class="card__text">Plantio de mudas nativas e recuperação de praças e mananciais.</p>
          <a href="#cadastro" class="btn btn--secondary">Participar</a>
        </article>
        <article class="card">
          <h2 class="card__title">Inclusão Digital</h2>
          <p class="card__text">Aulas práticas de informática e lógica para jovens da comunidade.</p>
          <a href="#cadastro" class="btn btn--secondary">Participar</a>
        </article>
        <article class="card">
          <h2 class="card__title">Alimentação Digna</h2>
          <p class="card__text">Distribuição e preparo de refeições nutritivas para famílias em vulnerabilidade.</p>
          <a href="#cadastro" class="btn btn--secondary">Participar</a>
        </article>
      </div>
    </section>
  `;
}

// Tela 3: Cadastro
export function templateCadastro() {
  return `
    <section class="form-card">
      <div id="feedback-toast" class="feedback-msg feedback-msg--success" role="status" aria-live="polite">
        ✓ Cadastro realizado com sucesso! Seus dados foram salvos.
      </div>
      <h1 class="page-title">Cadastro de Voluntário</h1>
      <p class="page-subtitle">Preencha o formulário para ingressar nas atividades voluntárias.</p>
      
      <form id="form-cadastro" novalidate>
        <fieldset class="fieldset">
          <legend class="legend">Dados Pessoais</legend>

          <div class="form-group">
            <label for="nome" class="form-label">Nome Completo *</label>
            <input type="text" id="nome" class="form-input" placeholder="Ex: Mariana Silva" aria-describedby="nome-error" required>
            <span id="nome-error" class="field-error" role="alert">Por favor, informe seu nome completo.</span>
          </div>

          <div class="form-group">
            <label for="email" class="form-label">E-mail *</label>
            <input type="email" id="email" class="form-input" placeholder="Ex: mariana@exemplo.com" aria-describedby="email-error" required>
            <span id="email-error" class="field-error" role="alert">Informe um e-mail válido com @ e domínio.</span>
          </div>

          <div class="form-group">
            <label for="cpf" class="form-label">CPF *</label>
            <input type="text" id="cpf" class="form-input" placeholder="000.000.000-00" maxlength="14" aria-describedby="cpf-error" required>
            <span id="cpf-error" class="field-error" role="alert">Informe um CPF completo de 11 dígitos.</span>
          </div>

          <div class="form-group">
            <label for="telefone" class="form-label">Telefone / WhatsApp *</label>
            <input type="tel" id="telefone" class="form-input" placeholder="(00) 00000-0000" maxlength="15" aria-describedby="telefone-error" required>
            <span id="telefone-error" class="field-error" role="alert">Informe um telefone com DDD válido.</span>
          </div>

          <div class="form-group">
            <label for="projeto" class="form-label">Projeto de Atuação *</label>
            <select id="projeto" class="form-select" aria-describedby="projeto-error" required>
              <option value="">Selecione uma área...</option>
              <option value="Reflorestamento Urbano">Reflorestamento Urbano</option>
              <option value="Inclusão Digital">Inclusão Digital</option>
              <option value="Alimentação Digna">Alimentação Digna</option>
            </select>
            <span id="projeto-error" class="field-error" role="alert">Selecione uma área de atuação.</span>
          </div>

          <button type="submit" class="btn btn--primary">Confirmar Inscrição</button>
        </fieldset>
      </form>
    </section>
  `;
}

// Tela 4: Transparência e Auditoria
export function templateTransparencia() {
  const lista = getVoluntarios();
  
  let linhasHTML = '';
  if (lista && lista.length > 0) {
    for (let i = 0; i < lista.length; i++) {
      const v = lista[i];
      linhasHTML += `
        <tr>
          <td>` + v.nome + `</td>
          <td>` + ocultarEmail(v.email) + `</td>
          <td>` + ocultarCPF(v.cpf) + `</td>
          <td>` + ocultarTelefone(v.telefone) + `</td>
          <td>` + v.projeto + `</td>
          <td>` + v.dataCadastro + `</td>
        </tr>
      `;
    }
  } else {
    linhasHTML = `<tr><td colspan="6" style="text-align: center; color: var(--color-text-muted); padding: 2rem;">Nenhum voluntário cadastrado até o momento.</td></tr>`;
  }

  return `
    <section>
      <h1 class="page-title">Portal de Transparência</h1>
      <p class="page-subtitle">Relação pública de voluntários inscritos (dados protegidos de acordo com a LGPD).</p>
      
      <!-- Tabela de Registros -->
      <div class="table-wrapper" style="margin-bottom: 2.5rem;">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">E-mail</th>
              <th scope="col">CPF</th>
              <th scope="col">Telefone</th>
              <th scope="col">Projeto</th>
              <th scope="col">Data de Registro</th>
            </tr>
          </thead>
          <tbody>
            ` + linhasHTML + `
          </tbody>
        </table>
      </div>

      <!-- Canais de Contato Institucional / Suporte -->
      <h2 style="font-size: 1.3rem; color: var(--color-primary); margin-bottom: 1rem;">Canais de Atendimento e Suporte</h2>
      <div class="cards-grid">
        <article class="card">
          <h3 class="card__title">📞 Atendimento Telefônico</h3>
          <p class="card__text">Orientações gerais sobre projetos e dúvidas sobre a escala de voluntariado.</p>
          <p><strong>Telefone:</strong> (00) 0000-0000</p>
          <p style="font-size: 0.85rem; color: var(--color-text-muted);">Horário comercial de atendimento</p>
        </article>

        <article class="card">
          <h3 class="card__title">💬 Suporte Rápido</h3>
          <p class="card__text">Confirmações de cadastros e envio de dúvidas pontuais.</p>
          <p><strong>WhatsApp:</strong> (00) 00000-0000</p>
          <p style="font-size: 0.85rem; color: var(--color-text-muted);">Segunda a Sexta, das 08h às 18h</p>
        </article>

        <article class="card">
          <h3 class="card__title">✉️ Ouvidoria e LGPD</h3>
          <p class="card__text">Canal para retificação, atualização ou exclusão de registros da base pública.</p>
          <p><strong>E-mail:</strong> contato@exemplo.org.br</p>
          <p style="font-size: 0.85rem; color: var(--color-text-muted);">Retorno em até 2 dias úteis</p>
        </article>
      </div>
    </section>
  `;
}
