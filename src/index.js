
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import {Notify} from 'notiflix/build/notiflix-notify-aio';

const inputCountry = document.querySelector ('input#search-box');
const listCountry = document.querySelector ('.country-list');
const infoCountry = document.querySelector ('country-info');

const DEBOUNCE_DELAY = 300;

function inputHandler(event) {
    const searchInput = event.target.value.trim();

    cleanCountry()
    cleanListCountry()

    fetchCountries(searchInput)
    .then (data => {
        if (data.length > 10) {
            Notify.info('To many matches found. Please enter a more specific name'
            );
            return;

        }
        countryDataMarkup(data);        
    })
    .catch(err => {
        Notify.failure('Oops, there is no country with that name');
    });
};

function createListMarkup(data) {
    
    return data
    .map ( ( { name, flags}) =>
    `<li class="country-list_item") data-country = '${name.common}'><img class="country-info");

    .join('');
};

    


function createDataMarkup(data) {
const countryE1 = data [0];
const {name, capital, population,flags, languages } = countryE1;
return `
<li class="country_item">
    <div class="country_flag-name-container">
        <img src="${flags.svg}" alt="${name.common}" height="30px"/></p>
        <h1 class="country_title" >${name.official}</h2>
        </div>
        <p><b>Capital:</b> ${Capital}
        <p><b>Population:</b> ${population}</p>
        <p><b>Languages</b> ${Object.values(data[0].languages)}</p>
        </li>
        `;
        
    function countryDataMarkup(data) {
    if (data.length === 1) {
    const dataMarkup = createDatamarkup(data);
    info.Country.innerHTML = datamarkup;
    } else {
     const listMarkup = createListMarkup (data);
    listCountry.innerHTML = listMarkup;
    
    const listCountryItem = document.querySelectorAll ('li');

    listCountryItem.forEach(item => {
        item.addEventListener('click',event => {
            const clickedCountry = event.currentTarget.dataset.country;
            
            const wantedCountry = data.filter (
            country => country.name.common === clickedCountry
            );
            
            infoCountry.innerHTML = createDataMarkup(wantedCountry);
            console.log('item clicked!', clickedCountry);
            cleanListCountry();

});

});
};

};

inputCountry.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));

function cleanCountry() {

infoCountry.innerHTML = '';
};

funtion cleanListCountry() {
listCountry.innerHTML = '';
};
    
    
    }}


}