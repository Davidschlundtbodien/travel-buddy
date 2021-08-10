import {destinationRepo, tripRepo, traveler, travelerLogin, sendTripInfo} from './apiRequests'
import MicroModal from 'micromodal';

MicroModal.init();

let today = '2021/08/11'

const totalSpent = document.getElementById('totalSpent')
const travelerName = document.getElementById('travelerName')
const bookTripButton = document.getElementById('bookTripButton')
const pendingGallery = document.getElementById('pendingGallery')
const upcomingGallery = document.getElementById('upcomingGallery')
const pastGallery = document.getElementById('pastGallery')
const destinationOptions = document.getElementById('destinationOptions')
const startDate = document.getElementById('startDate')
const tripDuration = document.getElementById('tripDuration')
const travelerAmount = document.getElementById('travelerAmount')
const formSubmitButton = document.getElementById('formSubmit')





const updateDom = () => {
  updateHeader()
  updateTripGallery(pendingGallery, 'pending');
  updateTripGallery(upcomingGallery, 'upcoming');
  updateTripGallery(pastGallery, 'past');
  setDestinationOptions();
  formSubmitButton.addEventListener('click', submitTrip)
}

setTimeout(() => {
  updateDom()
}, 70);

const updateHeader = () => {
  totalSpent.innerText = `$${traveler.totalSpent}`
  travelerName.innerText = `${traveler.name}`
}

const updateTripGallery = (gallery, type) => {
  gallery.innerHTML = "";
  switch (type) {
    case 'pending':
      let pendingTrips = traveler.trips.filter(trip => trip.status === 'pending')
      pendingTrips.forEach(trip => {
        buildTripCard(trip, gallery)
      });
      break;
    case 'upcoming':
      let upcomingTrips = traveler.trips.filter(trip => trip.status === 'approved' && trip.date >= today)
      upcomingTrips.forEach(trip => {
        buildTripCard(trip, gallery)
      });
      break;
    case 'past':
      let pastTrips = traveler.trips.filter(trip => trip.status === 'approved' && trip.date < today)
      pastTrips.forEach(trip => {
        buildTripCard(trip, gallery)
      });
      break;
    default:
    console.log('no options selected')
  }
}

const buildTripCard = (trip, gallery) => {
  let destination = destinationRepo.findDestination(trip.destinationID)

  gallery.innerHTML += `
  <article class="trip-card">
    <img src="${destination.image}" alt="${destination.alt}">
    <div class="trip-description">
      <p>${destination.destination}</p>
      <p>${trip.date}</p>
    </div>
  </article>`
}

const setDestinationOptions = () => {
  destinationOptions.innerHTML = "";
  destinationRepo.destinations.forEach(destination => {
    destinationOptions.innerHTML += `<option value="${destination.id}">${destination.destination}</option>`
  });

}

const submitTrip = () => {
  event.preventDefault();
  let trip = {
    id: Date.now(),
    userID: traveler.id,
    destinationID: parseInt(destinationOptions.value),
    travelers: parseInt(travelerAmount.value),
    date: startDate.value.split("-").join("/"),
    duration: parseInt(tripDuration.value),
    status: 'pending',
    suggestedActivities:[]
  }
  sendTripInfo(trip)
  setTimeout(() => {
    updateTripGallery(pendingGallery, 'pending')
  }, 70);

}
