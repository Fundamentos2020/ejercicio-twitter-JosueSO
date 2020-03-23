//Variables
const listTweets = document.getElementById('tweets');

//Listeners
eventListener();

function eventListener() {

    //Agregar tweets
    document.getElementById("form-tweet").addEventListener("submit", agregaTweet);

    //Borrar tweet
    listTweets.addEventListener("click", borrarTweet);

    //Contenido cargado
    document.addEventListener("DOMContentLoaded", documentListo);
}

//Funciones

//Agregar el tweet
function agregaTweet(e) {
    e.preventDefault();

    //Obtener texto del tweet
    var areaTweet = document.getElementById("tweet-text");
    const tweet = areaTweet.value;

    //Crear nuevo elemento
    const item = document.createElement("div");

    //Dar estilo al tweet
    item.className = "row bt py-3";
    item.innerHTML = 
    `<div class="col-s-2">
        <img src="https://picsum.photos/200" alt="" class="img-fluid">
    </div>
    <div class="col-s-9 px-2">`
        + tweet +   
    `</div>
    <div class="col-s-1 text-center">
        <a href="" class="button-close">x</a>
    </div>`;

    //Agregar a la lista de tweets
    listTweets.appendChild(item);

    //Añadir a LocalStorage
    agegarTweetLS(tweet);

    areaTweet.value = "";
}

//Borrar el tweet
function borrarTweet(e) {
    e.preventDefault();

    if(e.target.className === "button-close") {
        //Obtener item
        var item = e.target.parentElement.parentElement;

        //Obtener texto del tweet
        var tweet = item.innerText.substring(0, item.innerText.length - 2);

        //Eliminar tweet del DOM
        item.remove();

        //Borrar de LS
        borrarTweetLS(tweet);
    }
}

//Agregar el tweet a LocalStorage
function agegarTweetLS(tweet) {
    let tweets;

    tweets = obtenerTweetsLS();

    //Añadir a la lista
    tweets.push(tweet);

    //Guardar los tweets en LS
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Obtener los tweets de LocalStorage
function obtenerTweetsLS(){
    let tweets;

    if (localStorage.getItem("tweets") === null){
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem("tweets"));
    }

    return tweets;
}

//Cargar Tweets en la lista
function documentListo() {
    let tweets;

    tweets = obtenerTweetsLS();

    tweets.forEach(tweet => {
        //Crear nuevo elemento
        const item = document.createElement("div");

        //Dar estilo al tweet
        item.className = "row bt py-3";
        item.innerHTML = 
        `<div class="col-s-2">
            <img src="https://picsum.photos/200" alt="" class="img-fluid">
        </div>
        <div class="col-s-9 px-2">`
            + tweet +   
        `</div>
        <div class="col-s-1 text-center">
            <a href="" class="button-close">x</a>
        </div>`;

        //Agregar a la lista de tweets
        listTweets.appendChild(item);
    });
}

//Eliminar tweet de LocalStorage
function borrarTweetLS(tweetBorrar){
    let tweets;

    tweets = obtenerTweetsLS();

    //Usar ciclo for para interrumpir cuando se borre el tweet
    //Esto evita borrar más de un tweet si hay 2 iguales
    for (var i = 0; i < tweets.length; i++) {
        if (tweets[i] === tweetBorrar) {
            tweets.splice(i, 1);
            break;
        }
    };

    localStorage.setItem('tweets', JSON.stringify(tweets));
}