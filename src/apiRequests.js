import Traveler from './classes/Traveler'
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
    travelerLogin(29)
})

let updateData = (data) => {
    destinationRepo = new DestinationRepository(data[0].destinations)
    tripRepo = new TripRepository(data[1].trips)
}

export { destinationRepo, tripRepo, traveler, travelerLogin}
