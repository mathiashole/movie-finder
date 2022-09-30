const API_URL = 'https://japceibal.github.io/japflix_api/movies-data.json'
const inputTag = document.getElementById("inputBuscar");

let getJSONData = function(url){
    let result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}


function showMoviesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentJapflix.length; i++){
        let movies = currentJapflix[i];

        if (((inputTag.value.toLowerCase() === undefined) || (movies.title.toLowerCase().indexOf(inputTag.value.toLowerCase()) != -1))||
            ((inputTag.value.toLowerCase() === undefined) || (movies.tagline.toLowerCase().indexOf(inputTag.value.toLowerCase()) != -1))||
            ((inputTag.value.toLowerCase() === undefined) || (movies.overview.toLowerCase().indexOf(inputTag.value.toLowerCase()) != -1))||
            ((inputTag.value.toLowerCase() === undefined) || movies.genres.some(({name})=>name.toLowerCase().includes(inputTag.value.toLowerCase())))){

            htmlContentToAppend += `            
            <div onclick="setInfo(${movies.id})" class="btn mb-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
            <div class="bg-dark list-group-item cursor-active">
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between text-light">
                            <h4 class="mb-1">${movies.title}</h4>
                        <div>
                        `
                        for (let count = 0; count < 5; count++) {

                            if(count < (movies.vote_average)/2){
                                htmlContentToAppend+=`
                                <span class="fa fa-star checked"></span>
                                `
                            } else {
                                htmlContentToAppend+=`
                                <span class="fa fa-star"></span>
                                `
                            }
                            
                        }
                    
                        htmlContentToAppend+=`
                    </div>    
                </div>
                    <p class="mb-1 text-start text-light">${movies.tagline}</p>
                </div>
            </div>
            </div>
            </div>
            `
        }

        document.getElementById("lista").innerHTML = htmlContentToAppend;
    }
}


function setInfo(movieId){
    const movie = currentJapflix.find(({id})=> id === movieId);
    if(movie){
        console.log(movie.genres[0].name);
        document.getElementById("offcanvasTopLabel").innerText = movie.title; 
        document.getElementById("offcanvasText").innerText = movie.overview;
        document.getElementById("year").innerText = "Year:  " + movie.release_date.slice(0,-6);
        document.getElementById("runtime").innerText = "Runtime:    " + movie.runtime;
        document.getElementById("budget").innerText = "Budget:  $" + movie.budget;
        document.getElementById("revenue").innerText = "Revenue:    $" + movie.revenue;
        
        for (let index = 0; index < movie.genres.length; index++) {
            const element = movie.genres[index];
            document.getElementById("offcanvasGenres").innerText += element.name + " - ";
        }
    }

};

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(API_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentJapflix = resultObj.data
        }
    });

    document.getElementById('btnBuscar').addEventListener("click", function(){

        inputTag.value.toLowerCase();
        

        showMoviesList();
    });


});
