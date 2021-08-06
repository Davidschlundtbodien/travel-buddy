import Trip from './Trip'

class TripRepository {
  constructor(trips) {
    this.trips = trips.map(data => new Trip(data))
  }

  filterUserTrips(userID) {
    return this.trips.filter(trip => trip.userID === userID)
  }
}


export default TripRepository
