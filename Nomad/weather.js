const weather = document.querySelector(".js-weather");

const API_KEY = "d00ada0b417811205810fafe34c8f286";
const COORDS = 'coords';

function getweather(lat,lng){
    console.log(lat,lng);
     fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response){
            return response.json();
        }).then(function(json){
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature}C In ${place}`;
        })        //데이터가 완전히 우리한테 넘어왔을떄 쓴다. 
}


function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));

}

function handleGeoSuccess(position){
     const latitude = position.coords.latitude;
     const longitude = position.coords.longitude;
     const coordsObj = {
         latitude ,
         longitude 
     };
     saveCoords(coordsObj);
     getweather(latitude,longitude)
}

function handleGeoError(){
    console.log('Can\'t access geo location');
}

function askForCoord(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoord(){
    const loadedCoords = localStorage.getItem(COORDS);
    if( loadedCoords === null){
        askForCoord();
    }
    else{
        const parseCoords = JSON.parse(loadedCoords);
        getweather(parseCoords.latitude, parseCoords. longitude);
    }
}

function init(){
    loadCoord();

}

init();
