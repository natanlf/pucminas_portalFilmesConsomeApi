const API_CONFIG = {
    baseUrl: "https://api.themoviedb.org/3/",
    baseUrlSlideImage: "https://www.themoviedb.org/t/p/original/",
    baseUrlCardImage: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/",
    apiKey: `851d30eff2dc450ca53a76e2de8d0582`,
    buscaEndpoint: "search/movie/",
    popularesEndpoint: "movie/popular/",
    cinemaEndpoint: "movie/now_playing/",
    language: "&language=pt-Br",
    page: 1
}

function pesquisarFilme(page = API_CONFIG.page) {
  API_CONFIG.page = page;
  document.getElementById("buscaFilme").innerHTML = buildSpinner();

  filmeBuscado = document.getElementById("buscarFilme").value;

  fetch(`${API_CONFIG.baseUrl}${API_CONFIG.buscaEndpoint}?api_key=${API_CONFIG.apiKey}${API_CONFIG.language}&query=${filmeBuscado}&page=${page}`)
  .then(resp => resp.json())
  .then(data => {

    let buscaFilmeId = document.getElementById("buscaFilme");
    buscaFilmeId.classList.remove("invisible");
    buscaFilmeId.classList.add("visible");
    buscaFilmeId.classList.add("p-4"); 

    let concatString=`<h2 class="text-center">Filme buscado: <b>${filmeBuscado}</b></h2>
    <div id="container-busca" class="row flex-row flex-nowrap">`;
      data.results.forEach(filme => {
        concatString += `<div class="card">
          <img src="${API_CONFIG.baseUrlCardImage}${filme.poster_path}" class="card-img-top" alt="${filme.original_title}">
            <div class="card-body">
              <h5 class="card-title">${filme.original_title}</h5>
              <p class="card-text">
              <p>${filme.release_date}</p>
              <p>Média de Votos: <span class="badge rounded-pill bg-primary">${filme.vote_average}</span></p>
              <p>Total Votos: <span class="badge rounded-pill bg-secondary">${filme.vote_count}</span></p>
            </div>
          </div>`;
      })    
      concatString += `</div>`;

      buscaFilmeId.innerHTML = concatString;

      if(data.total_pages > 1) {
        buildPagination(data.total_pages);
      }
  }).catch(error => {
    console.log(error)
    document.getElementById("container-populares").innerHTML = `<div class="alert alert-danger" role="alert">
      Erro - Problemas ao consumir a api</div>`
  })
}

function getPopulares() {
  document.getElementById("container-populares").innerHTML = buildSpinner();

    fetch(`${API_CONFIG.baseUrl}${API_CONFIG.popularesEndpoint}?api_key=${API_CONFIG.apiKey}${API_CONFIG.language}`)
        .then(resp => resp.json())
        .then(data => {

          let concatString="";
          data.results.forEach(filme => {
              concatString += `<div class="card">
              <img src="${API_CONFIG.baseUrlCardImage}${filme.poster_path}" class="card-img-top" alt="${filme.original_title}">
              <div class="card-body">
                <h5 class="card-title">${filme.original_title}</h5>
                <p class="card-text">
                <p>${filme.release_date}</p>
                <p>Média de Votos: <span class="badge rounded-pill bg-primary">${filme.vote_average}</span></p>
                <p>Total Votos: <span class="badge rounded-pill bg-secondary">${filme.vote_count}</span></p>
              </div>
            </div>`;
          })    

          document.getElementById("container-populares").innerHTML = concatString;
        }).catch(error => {
          console.log(error)
          document.getElementById("container-populares").innerHTML = `<div class="alert alert-danger" role="alert">
            Erro - Problemas ao consumir a api</div>`
        })
}

function getCinema() {
  document.getElementById("container-cinema").innerHTML = buildSpinner();
    fetch(`${API_CONFIG.baseUrl}${API_CONFIG.cinemaEndpoint}?api_key=${API_CONFIG.apiKey}${API_CONFIG.language}`)
        .then(resp => resp.json())
        .then(data => {

          let concatString="";
          data.results.forEach(filme => {
              concatString += `<div class="card">
              <img src="${API_CONFIG.baseUrlCardImage}${filme.poster_path}" class="card-img-top" alt="${filme.original_title}">
              <div class="card-body">
                <h5 class="card-title">${filme.original_title}</h5>
                <p class="card-text">
                <p>${filme.release_date}</p>
                <p>Média de Votos: <span class="badge rounded-pill bg-primary">${filme.vote_average}</span></p>
                <p>Total Votos: <span class="badge rounded-pill bg-secondary">${filme.vote_count}</span></p>
          
              </div>
            </div>`;
          })    

          document.getElementById("container-cinema").innerHTML = concatString;
        }).catch(error => {
          console.log(error)
          document.getElementById("container-populares").innerHTML = `<div class="alert alert-danger" role="alert">
            Erro - Problemas ao consumir a api</div>`
        })
}

getPopulares();
getCinema();

function buildItemPage(page) {
  if(API_CONFIG.page === page) {
    return `<li onclick="pesquisarFilme(${page})" class="page-item"><a class="page-link active-custom-page" href="#">${page}</a></li>`;
  } else {
    return `<li onclick="pesquisarFilme(${page})" class="page-item"><a class="page-link" href="#">${page}</a></li>`
  }
}

function buildSpinner() {
  return `
  <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="sr-only"></span>
    </div>
  </div>`;
}

function buildPagination(totalPages) {
  concatPages = ``;
        for(let index = 0; index < totalPages; index++) {
          concatPages += buildItemPage(index+1);
        }
        const containerBusca = document.getElementById("container-busca");
        let htmlPagination = `
        <div class="w-100 p-4">
          <nav aria-label="Page navigation example">
            <ul class="pagination d-flex flex-wrap justify-content-center">
              ${concatPages}
            </ul>
          </nav>
        </div>`;
        containerBusca.insertAdjacentHTML("afterend", htmlPagination);
}

