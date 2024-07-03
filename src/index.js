import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');
import { fetchCountries } from './fetchCountries';

const input = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const inputValue = event.target.value;

  countryInfo.innerHTML = '';
  countriesList.innerHTML = '';

  if (inputValue === '') {
    return;
  }

  fetchCountries(inputValue.trim())
    .then(renderCountry)
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

function renderCountry(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.warning(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }
  if (countries.length === 1) {
    renderInfoAboutCountry(countries);
  } else {
    renderListOfCountries(countries);
  }
}
function renderListOfCountries(countries) {
  const markup = countries
    .map(country => {
      return `<li class="country-list__flag" > <img src="${country.flags.svg}" alt="${country.name.official}" width="50"> <p class="country-list__name">${country.name.official}</p> </li> `;
    })
    .join('');
  return (countriesList.innerHTML = markup);
}

function renderInfoAboutCountry(countries) {
  const markup = countries
    .map(country => {
      return `<div class="country-info-title"><img src="${
        country.flags.svg
      }" alt="${
        country.name.official
      }" width="25"> <p class="country-info-title__name">${
        country.name.official
      }</p> </div>
      <ul class="country-info-list">
      </li> 
        <li class="country-info-list__item"><b>Capital: </b>${
          country.capital
        }</li>
         <li class="country-info-list__item"><b>Population: </b>${
           country.population
         }</li>
          <li class="country-info-list__item"><b>Languages: </b>${Object.values(
            country.languages
          )}</li>
        </ul> `;
    })
    .join('');
  return (countryInfo.innerHTML = markup);
}