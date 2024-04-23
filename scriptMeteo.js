// Recupero gli elementi di interesse dalla pagina
const htmlElement = document.documentElement;
const suggestion = document.querySelector('.suggestion');
const weatherIcon = document.querySelector('.weather-icon');
const weatherLocation = document.querySelector('.weather-location');
const weatherTemperature = document.querySelector('.weather-temperature');
//////////////////////////////////////////////////
// Barra di ricerca città 
// Seleziona l'input e l'etichetta
const input = document.getElementById('cityInput');
const label = document.querySelector('.search-label');

  // Aggiungi un listener per l'evento di input
  input.addEventListener('input', function() {
    // Se la casella di testo ha del testo, mantieni l'etichetta nella posizione spostata a sinistra
    if (input.value.trim() !== '') {
      label.classList.add('active');
      label.style.opacity = '0';
    } else {
      label.classList.remove('active');
      label.style.opacity = '1';
    }
  });
  
  // Aggiungi un listener per l'evento di blur (quando l'input perde il focus)
  input.addEventListener('blur', function() {
    // Rimuovi la classe solo se la casella di testo è vuota
    if (!input.value.trim()) {
      label.classList.remove('active');
    }
  });
///////////////////////////////////////////////////////////

  //Catturo la città inserita nellinput quando perdo il focus
    let coordinates= {};

    document.addEventListener("DOMContentLoaded", function() {
     const searchInput = document.querySelector('.search-input');
 
     searchInput.addEventListener('blur', async function() {
         const cityName = searchInput.value.trim();
         if (cityName !== '') {
             console.log(cityName);
              coordinates = await searchCity(cityName);
            await prova(coordinates.latitude, coordinates.longitude);
         }
     });
    });


    async function searchCity (cityName){

    // Chiamare API di tomtom per ottenere coordinate città

    const API_KEY1 = 'EI2FIOhDVf2BxPg2HGMd0ljsslNrTxzY';
    const lang1 = 'it-IT';

    const endpoint1 = `https://api.tomtom.com/search/2/geocode/${cityName}.json?key=${API_KEY1}&language=${lang1}`;

    // Chiamo e API di tomtom
    const response1 = await fetch(endpoint1);
    const data1 = await response1.json();

    console.log(data1);
      
    const latitudeCity = data1.results[0].position.lat;
    const longitudeCity = data1.results[0].position.lon;
    
    console.log(latitudeCity);
    console.log(longitudeCity);
    
    return{latitude:latitudeCity, longitude:longitudeCity};
        

    }
    function prova(latitude, longitude){
        // Utilizzare le coordinate ottenute
        console.log(latitude, longitude,"prova");
        // Prepariamoci a chiamare l'API di Open Weather
        const API_KEY = 'bd832622acc99b03e95f5648052a97cf';
        const units = 'metric';
        const lang = 'it';
      
        const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${units}&lang=${lang}`;
      
        // Chiamo l'API di Open Weather
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                console.log(data);
      
                const iconCode = data.weather[0].icon;
                const description = data.weather[0].description;
      
                // Riempio gli elementi della pagina
                weatherLocation.innerText = data.name;
                weatherIcon.alt = description;
                weatherIcon.src = `./immaginiMeteo/${iconCode}.png`;
                weatherTemperature.innerText = `${Math.floor(data.main.temp)}°`;
                suggestion.innerText = suggestions[iconCode];
      
                // Disattivare il loading
                htmlElement.className = '';
            })
            .catch(error => {
                console.error('Errore nella chiamata all\'API di Open Weather:', error);
            });
      };
    //searchCity();// RICORDATI DI FARE E POI CHIAMARE LA FUNZIONE altrimetni non funziona



