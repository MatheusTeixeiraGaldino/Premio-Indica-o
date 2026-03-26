import { listarColaboradores } from './colaboradores.js';

/**
 * Inicializa um componente de busca de colaboradores em um input.
 * @param {Object} options 
 * @param {HTMLInputElement} options.inputEl - O input de busca
 * @param {HTMLElement} options.resultsEl - O container onde os resultados serão exibidos
 * @param {Function} options.onSelect - Callback chamado ao selecionar um colaborador
 */
export function initColabSearch({ inputEl, resultsEl, onSelect }) {
  let debounceTimer;

  inputEl.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    clearTimeout(debounceTimer);

    if (query.length < 2) {
      resultsEl.innerHTML = '';
      resultsEl.classList.remove('open');
      return;
    }

    debounceTimer = setTimeout(async () => {
      try {
        const colaboradores = await listarColaboradores({ 
          busca: query,
          status: 'ativo'
        });

        renderResults(colaboradores, resultsEl, onSelect);
      } catch (error) {
        console.error('Erro ao buscar colaboradores:', error);
      }
    }, 300);
  });

  // Fechar resultados ao clicar fora
  document.addEventListener('click', (e) => {
    if (!inputEl.contains(e.target) && !resultsEl.contains(e.target)) {
      resultsEl.classList.remove('open');
    }
  });
}

function renderResults(lista, container, onSelect) {
  if (lista.length === 0) {
    container.innerHTML = '<div class="colab-item"><span class="meta">Nenhum colaborador ativo encontrado</span></div>';
  } else {
    container.innerHTML = lista.map(c => `
      <div class="colab-item" data-id="${c.id}">
        <span class="name">${c.nome}</span>
        <span class="meta">Chapa: ${c.matricula} | Setor: ${c.setor || '—'}</span>
      </div>
    `).join('');

    container.querySelectorAll('.colab-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        const colab = lista.find(c => c.id === id);
        if (colab) {
          onSelect(colab);
          container.classList.remove('open');
        }
      });
    });
  }
  container.classList.add('open');
}
