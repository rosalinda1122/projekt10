
import { fetchCountries } from '.fetchCountries';
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
            Notify.info('To many matches found. Please enter a more specific name');
            return;

        }
        countryDataMarkup(data);

            

        
    })
    .catch(err => {
        Notify.failure('Oops, there is no country with that name');
    });
}