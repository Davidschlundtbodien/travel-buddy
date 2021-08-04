import Trip from './Trip'

class TripRepository {
  constructor(trips) {
    this.trips = trips.map(data => new Trip(data))
  }
}


export default TripRepository
