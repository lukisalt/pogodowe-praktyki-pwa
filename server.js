const express = require('express');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
const request = require('request');

require('dotenv').config();

function startServer() {
  const app = express();

  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

  // Redirect HTTP to HTTPS,
  app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

  // Logging for each request
  app.use((req, resp, next) => {
    const now = new Date();
    const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
    const path = `"${req.method} ${req.path}"`;
    const m = `${req.ip} - ${time} - ${path}`;
  // eslint-disable-next-line no-console
    console.log(m);
    next();
  });


  app.get('/', function(req, res){
        res.render('index');
      });
  // pobieranie danych pogodowych na podstawie długości i szerokości geograficznych (dla GPS)
  app.get('/pogodagps', function(req, res){
    var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${req.query.lat}&lon=${req.query.lon}&units=metric&appid=${process.env.APIKEY}`;
      request(url, function (error, response, body) {
      if(error){
        console.log('error:', error);
      } else {
        var dane = JSON.parse(body);

        pogoda = {
          list : [
            {
              temperatura_minimalna : temperatura_min(dane.list, 0),
              temperatura_maksymalna : temperatura_maks(dane.list, 0),
              wilgotnosc : dane.list[0].main.humidity,
              cisnienie : dane.list[0].main.pressure,
              icon : dane.list[0].weather[0].icon,
              czas : dane.list[0].dt_txt
            },
            {
              temperatura_minimalna : temperatura_min(dane.list, 1),
              temperatura_maksymalna : temperatura_maks(dane.list, 1),
              wilgotnosc : dane.list[8].main.humidity,
              cisnienie : dane.list[8].main.pressure,
              icon : dane.list[8].weather[0].icon,
              czas : dane.list[8].dt_txt.substring(0,11)
            },
            {
              temperatura_minimalna : temperatura_min(dane.list, 2),
              temperatura_maksymalna : temperatura_maks(dane.list, 2),
              wilgotnosc : dane.list[16].main.humidity,
              cisnienie : dane.list[16].main.pressure,
              icon : dane.list[16].weather[0].icon,
              czas : dane.list[16].dt_txt.substring(0,11)
            }
          ],
          temperatura_aktualna : dane.list[0].main.temp,
          miasto : dane.city.name,
          lat : req.query.lat,
          lon : req.query.lon
        }

        res.send(pogoda);
      }
    });
  });
      // pobieranie danych pogodowych dla miast po ich numerze id
  app.get('/pogodamiasto', function(req, res){
    var url = `https://api.openweathermap.org/data/2.5/forecast?id=${req.query.miasto}&units=metric&appid=${process.env.APIKEY}`;
      request(url, function (error, response, body) {;
      if(error){
        console.log('error:', error);
      } else {
        var dane = JSON.parse(body);
        pogoda = {
          list : [
            {
              temperatura_minimalna : temperatura_min(dane.list, 0),
              temperatura_maksymalna : temperatura_maks(dane.list, 0),
              wilgotnosc : dane.list[0].main.humidity,
              cisnienie : dane.list[0].main.pressure,
              icon : dane.list[0].weather[0].icon,
              czas : dane.list[0].dt_txt
            },
            {
              temperatura_minimalna : temperatura_min(dane.list, 1),
              temperatura_maksymalna : temperatura_maks(dane.list, 1),
              wilgotnosc : dane.list[8].main.humidity,
              cisnienie : dane.list[8].main.pressure,
              icon : dane.list[8].weather[0].icon,
              czas : dane.list[8].dt_txt.substring(0,11)
            },
            {
              temperatura_minimalna : temperatura_min(dane.list, 2),
              temperatura_maksymalna : temperatura_maks(dane.list, 2),
              wilgotnosc : dane.list[16].main.humidity,
              cisnienie : dane.list[16].main.pressure,
              icon : dane.list[16].weather[0].icon,
              czas : dane.list[16].dt_txt.substring(0,11)
            }
          ],
          temperatura_aktualna : dane.list[0].main.temp,
          miasto : dane.city.name,
          lat : req.query.lat,
          lon : req.query.lon
        }
        res.send(pogoda);
      var weatherIcon = pogoda.icon;
      }
    });
  });

  // Handle requests for static files
  app.use(express.static('public'));

  // Start the server
  return app.listen('3000', () => {
    console.log('Local DevServer Started on port 3000...');
  });
}

startServer();



function temperatura_maks(lista, dzien){
  var temp=-30;
  for(var i=dzien*8; i<(dzien+1)*8; i++){
    if(lista[i].main.temp_max>temp){
      temp=lista[i].main.temp_max;
    }
  }
  return temp;
}

function temperatura_min(lista, dzien){
  var temp=40;
  for(var i=dzien*8; i<(dzien+1)*8; i++){
    if(lista[i].main.temp_min<temp){
      temp=lista[i].main.temp_min;
    }
  }
  return temp;
}
