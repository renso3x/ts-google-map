import axios from 'axios';

// Code goes here!
const form = document.querySelector('form') as HTMLFormElement
const addressInput = document.getElementById('address') as HTMLInputElement;

const GOOGLE_API_KEY = '';

// declare var google: any;

type GoogleReponse = {
  results: { geometry: { location: { lat: number, lng: number } } }[],
  status: "OK" | "ZERO_RESULTS";
}

function searchAddressHandler(event: Event) {
  event.preventDefault();

  const enteredAddress = addressInput.value;
  axios.get<GoogleReponse>(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
    enteredAddress)}&key=${GOOGLE_API_KEY}`
  ).then(response => {
    if(response.data.status !== "OK") {
      throw new Error("Could not fetch location!")
    }
    const coordinates = response.data.results[0].geometry.location;
    const map = new google.maps.Map(document.getElementById('map') as HTMLDivElement, {
      center: coordinates,
      zoom: 8
    });

    new google.maps.Marker({
      position: coordinates,
      map,
    });

  })
  .catch(err => {
    alert(err.message);
    console.log(err)
  })
}

form.addEventListener('submit', searchAddressHandler);