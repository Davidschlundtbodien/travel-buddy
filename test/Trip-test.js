import chai from 'chai';
const expect = chai.expect;
import trips from './sample-data/trips';
import destinations from './sample-data/destinations';
import Trip from '../src/classes/Trip';
import DestinationRepository from '../src/classes/DestinationRepository';

describe('Trip', () => {
  let trip, destinationRepo

  beforeEach(() => {
    destinationRepo = new DestinationRepository(destinations)
    trip = new Trip(trips[0])
  });

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  });

  it('should intialize a trip object', () => {
    expect(trip).to.be.an.instanceof(Trip)
    expect(trip.id).to.equal(1)
    expect(trip.userID).to.equal(44)
    expect(trip.destinationID).to.equal(3)
    expect(trip.travelers).to.equal(1)
    expect(trip.date).to.equal("2022/09/16")
    expect(trip.duration).to.equal(8)
    expect(trip.status).to.equal("approved")
  });

  it('should calculate travel cost with fee', () => {
    const totalCost = trip.calculateTripCost(destinationRepo)
    expect(totalCost).to.equal(2189)
  });
});
