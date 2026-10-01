import { saveVoluntario } from './storage.js';

export function setupFormCadastro() {
  const form = document.getElementById('form-cadastro');
  const toast = document.getElementById('feedback-toast');

  if (!form) return;

  const inputNome = document.getElementById('nome');
  const inputEmail = document.getElementById('email');
  const inputCpf = document.getElementById('cpf');
  const inputTelefone = document.getElementById('telefone');
  const selectProjeto = document.getElementById('projeto');

  // Máscara dinâmica de CPF: 000.000.000-00
  inputCpf.addEventListener('input', (e) => {
    let digits = e.target.value.replace(/\D/g, '');
    if (digits.length > 11) digits = digits.substring(0, 11);

    let formatado = digits;
    if (digits.length > 9) {
      formatado = digits.substring(0, 3) + '.' + digits.substring(3, 6) + '.' + digits.substring(6, 9) + '-' + digits.substring(9);
    } else if (digits.length > 6) {
      formatado = digits.substring(0, 3) + '.' + digits.substring(3, 6) + '.' + digits.substring(6);
    } else if (digits.length > 3) {
      formatado = digits.substring(0, 3) + '.' + digits.substring(3);
    }

    e.target.value = formatado;
  });

  // Máscara dinâmica de Telefone: (00) 00000-0000 ou (00) 0000-0000
  inputTelefone.addEventListener('input', (e) => {
    let digits = e.target.value.replace(/\D/g, '');
    if (digits.length > 11) digits = digits.substring(0, 11);

    let formatado = digits;
    if (digits.length > 10) {
      formatado = '(' + digits.substring(0, 2) + ') ' + digits.substring(2, 7) + '-' + digits.substring(7);
    } else if (digits.length > 6) {
      formatado = '(' + digits.substring(0, 2) + ') ' + digits.substring(2, 6) + '-' + digits.substring(6);
    } else if (digits.length > 2) {
      formatado = '(' + digits.substring(0, 2) + ') ' + digits.substring(2);
    } else if (digits.length > 0) {
      formatado = '(' + digits;
    }

    e.target.value = formatado;
  });

  // Evento de envio e validação
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valido = true;

    // Oculta avisos de erro anteriores
    const erros = document.querySelectorAll('.field-error');
    erros.forEach((el) => {
      el.style.display = 'none';
    });

    // 1. Validação Nome
    if (!inputNome.value.trim() || inputNome.value.trim().length < 3) {
      document.getElementById('nome-error').style.display = 'block';
      valido = false;
    }

    // 2. Validação E-mail
    const emailVal = inputEmail.value.trim();
    if (!emailVal.includes('@') || !emailVal.includes('.')) {
      document.getElementById('email-error').style.display = 'block';
      valido = false;
    }

    // 3. Validação CPF (11 dígitos numéricos)
    const cpfLimpo = inputCpf.value.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      document.getElementById('cpf-error').style.display = 'block';
      valido = false;
    }

    // 4. Validação Telefone (10 ou 11 dígitos numéricos)
    const telLimpo = inputTelefone.value.replace(/\D/g, '');
    if (telLimpo.length < 10 || telLimpo.length > 11) {
      document.getElementById('telefone-error').style.display = 'block';
      valido = false;
    }

    // 5. Validação Seleção de Projeto
    if (!selectProjeto.value) {
      document.getElementById('projeto-error').style.display = 'block';
      valido = false;
    }

    // Gravação e Feedback
    if (valido) {
      const novoRegistro = {
        nome: inputNome.value.trim(),
        email: inputEmail.value.trim(),
        cpf: inputCpf.value,
        telefone: inputTelefone.value,
        projeto: selectProjeto.value
      };

      const gravou = saveVoluntario(novoRegistro);

      if (gravou && toast) {
        toast.style.display = 'block';
        form.reset();

        setTimeout(() => {
          toast.style.display = 'none';
        }, 4000);
      }
    }
  });
}

