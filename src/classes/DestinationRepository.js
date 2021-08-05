import Destination from './Destination'

class DestinationRepository {
  constructor(destinations) {
    this.destinations = destinations.map(data => new Destination(data))
  }
};

export default DestinationRepository;
