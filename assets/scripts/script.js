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
    <div id="container-busca" class="container-filmes row flex-row flex-nowrap">`;
      data.results.forEach(filme => {
        concatString += `<div class="card">
          <img src="${API_CONFIG.baseUrlCardImage}${filme.poster_path}" class="card-img-top" alt="${filme.original_title}">
            <div class="card-body d-flex flex-column justify-content-around">
              <h5 class="card-title">${filme.original_title}</h5>
              <div class="card-text d-flex flex-wrap justify-content-between">
                <span>${convertPtBrDate(filme.release_date)}</span>
                ${buildMediaDeVotos(filme.vote_average, filme.vote_count)}
                <a href="#">Ver Detalhes</a>
              </div>
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
    document.getElementById("container-busca").innerHTML = `<div class="alert alert-danger" role="alert">
      Erro - Problemas ao consumir a api</div>`
  })
}

function getPopulares() {
  document.getElementById("buscaPopulares").innerHTML = buildSpinner();

    fetch(`${API_CONFIG.baseUrl}${API_CONFIG.popularesEndpoint}?api_key=${API_CONFIG.apiKey}${API_CONFIG.language}`)
        .then(resp => resp.json())
        .then(data => {

          let concatString=`<h2 class="text-center">Populares</h2>
          <div id="container-populares" class="container-filmes row flex-row flex-nowrap">`;
          data.results.forEach(filme => {
              concatString += `
            <div class="card">
              <img src="${API_CONFIG.baseUrlCardImage}${filme.poster_path}" class="card-img-top" alt="${filme.original_title}">
              <div class="card-body d-flex flex-column justify-content-around">
                <h5 class="card-title">${filme.original_title}</h5>
                <p class="card-text d-flex flex-wrap justify-content-between">
                <span>${convertPtBrDate(filme.release_date)}</span>
                ${buildMediaDeVotos(filme.vote_average, filme.vote_count)}
                <a href="#">Ver Detalhes</a>
              </div>
            </div>
            `;
          })    
          concatString += `</div>`;
          document.getElementById("buscaPopulares").innerHTML = concatString;
        }).catch(error => {
          console.log(error)
          document.getElementById("buscaPopulares").innerHTML = `<div class="alert alert-danger" role="alert">
            Erro - Problemas ao consumir a api</div>`
        })
}

function getCinema() {
  document.getElementById("buscaCinema").innerHTML = buildSpinner();
    fetch(`${API_CONFIG.baseUrl}${API_CONFIG.cinemaEndpoint}?api_key=${API_CONFIG.apiKey}${API_CONFIG.language}`)
        .then(resp => resp.json())
        .then(data => {

          
          let concatString=`<h2 class="text-center">Cinema</h2>
          <div id="container-cinema" class="container-filmes row flex-row flex-nowrap">`;
          data.results.forEach(filme => {
              concatString += `<div class="card">
              <img src="${API_CONFIG.baseUrlCardImage}${filme.poster_path}" class="card-img-top" alt="${filme.original_title}">
              <div class="card-body d-flex flex-column justify-content-around">
                <h5 class="card-title">${filme.original_title}</h5>
                <p class="card-text d-flex flex-wrap justify-content-between">
                <span>${convertPtBrDate(filme.release_date)}</span>
                ${buildMediaDeVotos(filme.vote_average, filme.vote_count)}
                <a href="#">Ver Detalhes</a>
              </div>
            </div>`;
          })    
          concatString += `</div>`;  
          document.getElementById("buscaCinema").innerHTML = concatString;
        }).catch(error => {
          console.log(error)
          document.getElementById("buscaCinema").innerHTML = `<div class="alert alert-danger" role="alert">
            Erro - Problemas ao consumir a api</div>`
        })
}

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

function buildMediaDeVotos(media, totalVotos) {
  if(media) {
    let classMediaVotos = "";
    if(media >= 7.0) {
      classMediaVotos = "media-votos-top";
    } else if(media >= 6.0 && media < 7.0) {
      classMediaVotos = "media-votos-medio";
    } else {
      classMediaVotos = "media-votos-baixo";
    }
    return `<span class="badge rounded-pill bg-primary media-votos ${classMediaVotos}">${media*10}</span>`;
  }
}

function convertPtBrDate(date) {
  if(date) {
    let dateArray = date.split("-");
    return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`
  }
}


function init() {
  getPopulares();
  getCinema();
}

init();
