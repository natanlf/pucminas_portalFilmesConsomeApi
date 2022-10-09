const API_CONFIG = {
    baseUrl: "https://api.themoviedb.org/3/",
    baseUrlSlideImage: "https://www.themoviedb.org/t/p/original/",
    baseUrlCardImage: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/",
    apiKey: `851d30eff2dc450ca53a76e2de8d0582`,
    buscaEndpoint: "search/movie/",
    popularesEndpoint: "movie/popular/",
    cinemaEndpoint: "movie/now_playing/",
    language: "&language=pt-Br"
}

function pesquisarFilme() {
  filmeBuscado = document.getElementById("buscarFilme").value; 
  fetch(`${API_CONFIG.baseUrl}${API_CONFIG.buscaEndpoint}?api_key=${API_CONFIG.apiKey}${API_CONFIG.language}&query=${filmeBuscado}`)
  .then(resp => resp.json())
  .then(data => {

    let buscaFilmeId = document.getElementById("buscaFilme");
    buscaFilmeId.classList.remove("invisible");
    buscaFilmeId.classList.add("visible");
    buscaFilmeId.classList.add("p-4");

    let concatString=`<h2 class="text-center">Busca Filmes</h2>
    <div id="container-busca" class="d-flex flex-wrap justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-between justify-content-xl-between">`;
      data.results.forEach(filme => {
        concatString += `<div class="card" style="width: 18rem;">
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

      document.getElementById("buscaFilme").innerHTML = concatString;
  }).catch(error => {
    console.log(error)
    document.getElementById("container-populares").innerHTML = `<div class="alert alert-danger" role="alert">
      Erro - Problemas ao consumir a api</div>`
  })
}

function getPopulares() {
    fetch(`${API_CONFIG.baseUrl}${API_CONFIG.popularesEndpoint}?api_key=${API_CONFIG.apiKey}${API_CONFIG.language}`)
        .then(resp => resp.json())
        .then(data => {

          let concatString="";
          data.results.forEach(filme => {
              concatString += `<div class="card" style="width: 18rem;">
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
    fetch(`${API_CONFIG.baseUrl}${API_CONFIG.cinemaEndpoint}?api_key=${API_CONFIG.apiKey}${API_CONFIG.language}`)
        .then(resp => resp.json())
        .then(data => {

          let concatString="";
          data.results.forEach(filme => {
              concatString += `<div class="card" style="width: 18rem;">
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

