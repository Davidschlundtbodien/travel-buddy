import {destinationRepo, traveler, travelerLogin, sendTripInfo} from './apiRequests'
import MicroModal from 'micromodal';
import Trip from './classes/Trip';

MicroModal.init();
MicroModal.show('modal-2')

let today = '2021/08/11'

// INDEX ELEMENTS
const totalSpent = document.getElementById('totalSpent')
const travelerName = document.getElementById('travelerName')
const pendingGallery = document.getElementById('pendingGallery')
const upcomingGallery = document.getElementById('upcomingGallery')
const pastGallery = document.getElementById('pastGallery')
// FORM ELEMENTS
const destinationOptions = document.getElementById('destinationOptions')
const startDate = document.getElementById('startDate')
const tripDuration = document.getElementById('tripDuration')
const travelerAmount = document.getElementById('travelerAmount')
const formSubmitButton = document.getElementById('formSubmit')
const xCloseButton = document.getElementById('xClose')
const closeButton = document.getElementById('closeButton')
const getEstimateButton = document.getElementById('getEstimate')
// LOGIN ELEMENTS
const userNameInput = document.getElementById('userName')
const passwordInput = document.getElementById('password')
const loginButton = document.getElementById('login')

const intLogin = () => {
  userNameInput.addEventListener('keyup', checkLogin)
  passwordInput.addEventListener('keyup', checkLogin)
  loginButton.addEventListener('click', loginUser)
}

const updateDom = () => {
  updateHeader()
  updateTripGallery(pendingGallery, 'pending');
  updateTripGallery(upcomingGallery, 'upcoming');
  updateTripGallery(pastGallery, 'past');
  setDestinationOptions();
  formSubmitButton.addEventListener('click', submitTrip)
  startDate.addEventListener('keyup', checkForm)
  tripDuration.addEventListener('keyup', checkForm)
  travelerAmount.addEventListener('keyup', checkForm)
  xCloseButton.addEventListener('click', clearValues)
  closeButton.addEventListener('click', clearValues)
  getEstimateButton.addEventListener('click', getTripEstimate)
}

setTimeout(() => {
  intLogin()
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
    suggestedActivities: []
  }
  clearValues()
  sendTripInfo(trip)
  setTimeout(() => {
    updateTripGallery(pendingGallery, 'pending')
    updateHeader()
  }, 70);

}

const clearValues = () => {
  startDate.value = "";
  tripDuration.value = "";
  travelerAmount.value = "";
  formSubmitButton.disabled = true;
  getEstimateButton.disabled = true;
  getEstimateButton.innerText = 'Get Estimate'
};

const checkForm = () => {
  let dateCheck = startDate.value.length > 0;
  let durationCheck = parseInt(tripDuration.value) > 0;
  let travelersCheck = parseInt(travelerAmount.value) > 0;
  if (dateCheck && durationCheck && travelersCheck) {
    formSubmitButton.disabled = false;
    getEstimateButton.disabled = false;
    getEstimateButton.innerText = 'Get Estimate';
  } else {
    formSubmitButton.disabled = true;
    getEstimateButton.disabled = true;
  }
};

const getTripEstimate = () => {
  event.preventDefault();
  let trip = new Trip({
    id: Date.now(),
    userID: traveler.id,
    destinationID: parseInt(destinationOptions.value),
    travelers: parseInt(travelerAmount.value),
    date: startDate.value.split("-").join("/"),
    duration: parseInt(tripDuration.value),
    status: 'pending',
    suggestedActivities: []
  })

  getEstimateButton.innerText = `$${trip.calculateTripCost(destinationRepo)}`
  getEstimateButton.disabled = true;
}

const checkLogin = () => {
  let id = parseInt(userNameInput.value.split("traveler")[1])
  let userNameCheck = (id <= 50 && id > 0)
  let passwordCheck = passwordInput.value === 'travel'
  if (userNameCheck && passwordCheck) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

const loginUser = () => {
  event.preventDefault()
  let id = parseInt(userNameInput.value.split("traveler")[1])
  travelerLogin(id)
  setTimeout(() => {
    updateDom()
  }, 70);
}
