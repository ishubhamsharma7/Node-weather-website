const search = document.querySelector('input')
const msgOne = document.getElementById('msg-1')
const msgTwo = document.getElementById('msg-2')
const msgThree = document.getElementById('msg-3')
const msgFour = document.getElementById('msg-4')


const weatherForm = document.querySelector('form')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value
    const url = '/weather?address=' + location;

    msgOne.textContent = "Loading...."
    msgTwo.textContent = ""
    fetch(url).then((res) => {
        res.json().then((data) => {
            msgOne.textContent = 'Location : ' + data.location;
            msgTwo.textContent = 'Temperature : ' + data.forecast.temp;
            msgThree.textContent = 'Weather Today : ' + data.forecast.todaysWeather;
            msgFour.textContent = 'Max Temperature : ' + data.forecast.Max_Temp;

            console.log(data)
        })
    })
        .catch((e) => {
            msgOne.textContent = e;
            console.log(e)
        })
})