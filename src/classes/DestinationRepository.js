import Destination from './Destination'

class DestinationRepository {
  constructor(destinations) {
    this.destinations = destinations.map(data => new Destination(data))
  }

  findDestination(destinationID) {
    return this.destinations.find(destination => destination.id === destinationID)
  }
};

export default DestinationRepository;
