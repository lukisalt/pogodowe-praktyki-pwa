// funkcja pobierająca dane pogodowe na podstawie lokacji z pomocą openweather
function pogodaGps(lat, lon){
  let url='/pogodagps?lat='+lat+"&lon="+lon;
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open('GET', url);
  xhr.onload = () => {
    var miasto = document.getElementById('miasto');
    miasto.innerHTML = xhr.response.miasto;
    miasto.style.display = "block";
    var temperatura_aktualna = document.getElementById(`temperatura_aktualna`);
    temperatura_aktualna.innerHTML = "Temperatura aktualna: " + xhr.response.temperatura_aktualna + "°C";
    temperatura_aktualna.style.display = "block";
    for(var i=0; i<3; i++){
      var iconUrl = `https://openweathermap.org/img/wn/${xhr.response.list[i].icon}@2x.png`;
      var temperatura_minimalna = document.getElementById(`temperatura_minimalna${i}`);
      var temperatura_maksymalna = document.getElementById(`temperatura_maksymalna${i}`);
      var wilgotnosc = document.getElementById(`wilgotnosc${i}`);
      var cisnienie = document.getElementById(`cisnienie${i}`);
      var czas = document.getElementById(`czas${i}`);
      var icon = document.getElementById(`icon${i}`);
      czas.innerHTML = "Prognoza dla: " + xhr.response.list[i].czas;
      czas.style.display = "block";
      temperatura_minimalna.innerHTML = "Temperatura minimalna: " + xhr.response.list[i].temperatura_minimalna + "°C";
      temperatura_minimalna.style.display = "block";
      temperatura_maksymalna.innerHTML = "Temperatura maksymalna: " + xhr.response.list[i].temperatura_maksymalna + "°C";
      temperatura_maksymalna.style.display = "block";
      cisnienie.innerHTML = "Ciśnienie: " + xhr.response.list[i].cisnienie + " hPa";
      cisnienie.style.display = "block";
      wilgotnosc.innerHTML = "Wilgotność : " + xhr.response.list[i].wilgotnosc + "%";
      wilgotnosc.style.display = "block";
      icon.innerHTML = `<img src="${iconUrl}" alt="obrazek_pogody" />`;
      icon.style.display = "block";
    }
  };
  xhr.send();
}

// funckaj pobierająca dane dla konkretnego miasta po jego ID z pomocą openweather
function pogodaMiasto(miasto){
  let url='/pogodamiasto?miasto='+miasto;
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open('GET', url);
  xhr.onload = () => {
    var miasto = document.getElementById('miasto');
    var opcje_miast = document.querySelector('.opcje_miast');
    var temperatura_aktualna = document.getElementById(`temperatura_aktualna`);
    temperatura_aktualna.innerHTML = "Temperatura aktualna: " + xhr.response.temperatura_aktualna + "°C";
    temperatura_aktualna.style.display = "block";
    miasto.innerHTML = opcje_miast.options[opcje_miast.selectedIndex].text;
    miasto.style.display = "block";
    for(var i=0; i<3; i++){
      var iconUrl = `https://openweathermap.org/img/wn/${xhr.response.list[i].icon}@2x.png`;;
      var temperatura_minimalna = document.getElementById(`temperatura_minimalna${i}`);
      var temperatura_maksymalna = document.getElementById(`temperatura_maksymalna${i}`);
      var wilgotnosc = document.getElementById(`wilgotnosc${i}`);
      var cisnienie = document.getElementById(`cisnienie${i}`);
      var czas = document.getElementById(`czas${i}`);
      var icon = document.getElementById(`icon${i}`);
      czas.innerHTML = "Prognoza dla: " + xhr.response.list[i].czas;
      czas.style.display = "block";
      temperatura_minimalna.innerHTML = "Temperatura minimalna: " + xhr.response.list[i].temperatura_minimalna + "°C";
      temperatura_minimalna.style.display = "block";
      temperatura_maksymalna.innerHTML = "Temperatura maksymalna: " + xhr.response.list[i].temperatura_maksymalna + "°C";
      temperatura_maksymalna.style.display = "block";
      cisnienie.innerHTML = "Ciśnienie: " + xhr.response.list[i].cisnienie + " hPa";
      cisnienie.style.display = "block";
      wilgotnosc.innerHTML = "Wilgotność : " + xhr.response.list[i].wilgotnosc + "%";
      wilgotnosc.style.display = "block";
      icon.innerHTML = `<img src="${iconUrl}" alt="obrazek_pogody" />`;
      icon.style.display = "block";
    }
  };
  xhr.send();
}
