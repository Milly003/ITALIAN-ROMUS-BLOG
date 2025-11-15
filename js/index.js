window.addEventListener("DOMContentLoaded", () => {
  let carouselInterval = null;
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
  carregarComponente("./components/header.html", "#header");
  carregarComponente("./components/footer.html", "#footer");

  fetch("./components/imagens.html")
    .then(res => {
      if (!res.ok) throw new Error("Erro ao carregar imagens.html");
      return res.text();
    })
    .then(data => {
      const imagensContainer = document.getElementById("imagens-container");
      if (imagensContainer) imagensContainer.innerHTML = data;
      else document.body.insertAdjacentHTML("beforeend", data);

      initCarousel();
    })
    .catch(err => console.error(err));
  function carregarPagina(pagina) {
    fetch(`./pages/${pagina}`)
      .then(res => {
        if (!res.ok) throw new Error(`Erro ao carregar ${pagina} (status ${res.status})`);
        return res.text();
      })
      .then(data => {
        const conteudo = document.getElementById("conteudo");
        if (conteudo) {
          conteudo.innerHTML = data;

          initCarousel();
        }
      })
      .catch(err => console.error(err));
  }
  carregarPagina("home.html");
  window.carregarPagina = carregarPagina;

  function initCarousel() {
    if (carouselInterval) {
      clearInterval(carouselInterval);
      carouselInterval = null;
    }
    const imgs = Array.from(document.querySelectorAll(".carousel img"));
    if (!imgs || imgs.length === 0) {
      return;
    }
    imgs.forEach(img => img.classList.remove("active"));
    let idx = 0;
    imgs[idx].classList.add("active");
    carouselInterval = setInterval(() => {
      imgs[idx].classList.remove("active");
      idx = (idx + 1) % imgs.length;
      imgs[idx].classList.add("active");
    }, 3000);
  }
});
