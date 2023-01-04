
/* Description: i didint find an api that gives me the weather of the country,
 so i used the weather api to get the weather of the capital of the country*/



//show flags of 12 random countries

function handleCountries(countries) {

    //select 12 random unique countries
    const selectedCountries = new Set();
    while (selectedCountries.size < 12 && selectedCountries.size < countries.length) {
        const index = Math.floor(Math.random() * 250);
        const country = countries[index];
        selectedCountries.add(country);
    }
    //create a div for each country (name, capital, flag)
    const container = document.querySelector('.container');
    let i = 0;
    for (const country of selectedCountries) {
        //get the name, capital and flag of the country
        const { flags: { png: flag }, name: { common: name }, capital } = country;
        const div = document.createElement('div');
        //create a div for each country
        div.innerHTML = `
        <h2>${name}</h2>
        <p>Capital: ${capital}</p>
        <img src="${flag}" alt="${name}" id="${i}"  onclick="showWeather(${i})"/>
      `;
        //add the capital of the country to the div as an information
        div.setAttribute("class", "card");
        div.setAttribute("data", capital);
        const temp = document.createElement('div');
        container.appendChild(div);
        i++;
    }
}

//show weather of the capital of the country

function showWeather(id) {

    const api_key = `07d78e859dd94308bf0125349230401`
    const capital = document.getElementById(id).parentElement.getAttribute("data");

    console.log(capital);

    //get weather of the capital (as i cant get the weather of the country)
    fetch(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${capital}`) //get weather of the capital
        .then(response => response.json())
        .then(data => {
            console.log(data.current.temp_c);
            //create a div with the temperature (call the function)
            createWeatherCard(data.current.temp_c, id);

        })
        .catch(err => alert("Weather not available for this country"))//unfortunately, the weather api doesnt have weather for all countries

}

function createWeatherCard(temp, id) {
    //if the div already exists, remove it (to get the new temperature)
    if (document.getElementById(id).parentElement.lastChild.id == id) {
        document.getElementById(id).parentElement.lastChild.remove();
    } else {
        //create a div with the temperature
        const div = document.createElement("div");
        div.innerHTML = `
          <h2>Temperature: ${temp}°C</h2>
        `;
        div.setAttribute("class", "weatherCard");
        div.setAttribute("id", id);
        div.setAttribute("class", "flash");//animation (akramcss xd)
        document.getElementById(id).parentElement.appendChild(div);//add the div to the card

    }
}

//get the countries from the api
fetch(`https://restcountries.com/v3.1/all`)
    .then(response => response.json())
    .then(handleCountries)
    .catch(err => console.log(err))


