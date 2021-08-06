

class Traveler {
  constructor(traveler, tripRepo) {
    this.id = traveler.id
    this.name = traveler.name
    this.type = traveler.travelerType
    this.trips = tripRepo.filterUserTrips(this.id)
    this.totalSpent = 0
  }

  calculateTotalSpent(destinationRepo) {
    return this.totalSpent = this.trips.reduce((acc, trip) => {
      return acc += trip.calculateTripCost(destinationRepo)
    }, 0)
  }
}

export default Traveler;
