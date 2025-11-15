
// Carrega header.html
fetch("components/header.html")
    .then(response => response.text())
    .then(data => document.getElementById("header").innerHTML = data);

// Carrega footer.html
fetch("components/footer.html")
    .then(response => response.text())
    .then(data => document.getElementById("footer").innerHTML = data);

// carrega o imagens.html
fetch("components/imagens.html")
    .then(response => response.text())
    .then(data => document.body.insertAdjacentHTML("beforeend", data));

// ===== Função para carregar páginas =====
function carregarPagina(pagina) {
  fetch(`pages/${pagina}`)
    .then(res => {
      if (!res.ok) throw new Error(`Erro ao carregar ${pagina}`);
      return res.text();
    })
    .then(data => {
      document.getElementById("conteudo").innerHTML = data;
    })
    .catch(err => console.error(err));
}

// ===== Carrega HOME por padrão =====
window.addEventListener("DOMContentLoaded", () => {
  carregarPagina("home.html");

});


