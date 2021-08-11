import Traveler from './classes/Traveler'
import Trip from './classes/Trip'
import DestinationRepository from './classes/DestinationRepository'
import TripRepository from './classes/TripRepository'

let destinationRepo, tripRepo, traveler

let fetchData = (dataType) => {
  return fetch(`http://localhost:3001/api/v1/${dataType}`)
    .then(response => {
      return response.ok ? response.json() : console.log(`ERROR with ${dataType} path`)
    })
    .then(data => data)
}

let travelerLogin = (id) => {
  return fetch(`http://localhost:3001/api/v1/travelers/${id}`)
    .then(response => {
      return response.ok ? response.json() : console.log(`Could not find traveler`)
    })
    .then(data => {
      traveler = new Traveler(data, tripRepo)
      traveler.calculateTotalSpent(destinationRepo)
      return traveler
    })
}


Promise.all([fetchData('destinations'), fetchData('trips')]).then((data)=> {
  updateData(data)
})

let updateData = (data) => {
  destinationRepo = new DestinationRepository(data[0].destinations)
  tripRepo = new TripRepository(data[1].trips)
}

//POST

const sendTripInfo = (trip) => {
  return fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    body: JSON.stringify(trip),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(tripData => {
      traveler.trips.push(new Trip(tripData.newTrip))
      traveler.calculateTotalSpent(destinationRepo)
    })
    .catch(err => console.log(err));
}

export { destinationRepo, tripRepo, traveler, travelerLogin, sendTripInfo}
