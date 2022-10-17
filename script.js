document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if (input !== '') {
        clearInfo();
        showWarning('<div class="spinner-border"></div>');

        let url = `//api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}
        &appid=827f97e571a8d94354301445f72e48e4&units=metric&lang=pt_br`;

        let results = await fetch(url);

        let json = await results.json();

        if (json.cod === 200) {

            showInfo({

                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })

        } else {
            clearInfo();
            showWarning(`Não localizado.`);
        }
    }
    else {
        clearInfo();

    }
    document.getElementById("searchInput").value = "";
})

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

function showInfo(json) {

    showWarning('');
    document.querySelector('.resultado').style.display = "block";
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>°C</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <spam>km/h</spam>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;

}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

// Desativa botão caso input esteja vazio
function checkInputs(inputs) {

    var filled = true;

    inputs.forEach(function(input) {

      if(input.value === "") {
          filled = false;
      }

    });

    return filled;

  }

  var inputs = document.querySelectorAll("input");
  var button = document.querySelector("button");

  inputs.forEach(function(input) {

    input.addEventListener("keyup", function() {

      if(checkInputs(inputs)) {
        button.disabled = false;
      } else {
        button.disabled = true;
      }

    });

  });
