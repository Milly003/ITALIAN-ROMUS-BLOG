// index.js - versão recomendada
window.addEventListener("DOMContentLoaded", () => {

  // Helper para carregar um componente e inserir no elemento alvo
  const carregarComponente = (caminho, seletor, inserirComoHTML = false) => {
    fetch(caminho)
      .then(res => {
        if (!res.ok) throw new Error(`Erro ao carregar ${caminho} (status ${res.status})`);
        return res.text();
      })
      .then(data => {
        const el = document.querySelector(seletor);
        if (el) {
          if (inserirComoHTML) el.insertAdjacentHTML("beforeend", data);
          else el.innerHTML = data;
        } else {
          console.warn(`Elemento ${seletor} não encontrado — ignorando conteúdo de ${caminho}`);
        }
      })
      .catch(err => console.error(err));
  };

  // Carrega header e footer (componentes)
  carregarComponente("./components/header.html", "#header");
  carregarComponente("./components/footer.html", "#footer");

  // Carrega imagens.html e insere no container #imagens-container (se existir),
  // caso contrário anexa ao final do body
  fetch("./components/imagens.html")
    .then(res => {
      if (!res.ok) throw new Error("Erro ao carregar imagens.html");
      return res.text();
    })
    .then(data => {
      const imagensContainer = document.getElementById("imagens-container");
      if (imagensContainer) imagensContainer.innerHTML = data;
      else document.body.insertAdjacentHTML("beforeend", data);
    })
    .catch(err => console.error(err));

  // ===== Função para carregar páginas =====
  function carregarPagina(pagina) {
    fetch(`./pages/${pagina}`)
      .then(res => {
        if (!res.ok) throw new Error(`Erro ao carregar ${pagina} (status ${res.status})`);
        return res.text();
      })
      .then(data => {
        const conteudo = document.getElementById("conteudo");
        if (conteudo) conteudo.innerHTML = data;
      })
      .catch(err => console.error(err));
  }

  // ===== Carrega HOME por padrão =====
  carregarPagina("home.html");
  window.carregarPagina = carregarPagina;
});



