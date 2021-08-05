
class Trip {
  constructor(trip) {
    this.id = trip.id
    this.userID = trip.userID
    this.destinationID = trip.destinationID
    this.travelers = trip.travelers
    this.date = trip.date
    this.duration = trip.duration
    this.status = trip.status
    this.suggestedActivities = trip.suggestedActivities
  }

  calculateTripCost(destination) {
    const duration = this.duration
    const travlerAmount = this.travelers
    const travelCost = destination.calculateTravelCost(duration, travlerAmount)
    return (travelCost * .10) + travelCost
  }
}

export default Trip;
