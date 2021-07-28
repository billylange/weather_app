const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');

search.value = '';
msg1.innerHTML = '';
msg2.innerHTML = '';

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  fetch(`/weather?location=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msg1.textContent = data.error;
      } else {
        msg1.textContent = data.location;
        msg2.innerHTML = `<strong>Sky:</strong> ${data.forecastData.description[0]}<br>
        <strong>Tempature:</strong> ${data.forecastData.temperature.actual} &ordm;C (feels like: ${data.forecastData.temperature.feelslike})<br>
        <strong>Wind:</strong> ${data.forecastData.wind.speed}km/h from the ${data.forecastData.wind.direction.compass} (${data.forecastData.wind.direction.degree}&ordm;)<br>
        <strong>Rain:</strong> There is a ${data.forecastData.precipetation}% change of rain.`;
        console.log(data);
      }
    })
  })
})
