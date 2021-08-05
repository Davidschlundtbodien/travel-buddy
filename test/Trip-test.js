import chai from 'chai';
const expect = chai.expect;
import trips from './sample-data/trips';
import Trip from '../src/classes/Trip';

describe('Trip', () => {
  let trip

  beforeEach(() => {
    trip = new Trip(trips[0])
  });

  it('should be a function', () => {
    expect(Trip).to.be.a('function');
  });

  it('should intialize a trip object', () => {
    expect(trip).to.be.an.instanceof(Trip)
    expect(trip.id).to.equal(1)
    expect(trip.userID).to.equal(44)
    expect(trip.destinationID).to.equal(49)
    expect(trip.travelers).to.equal(1)
    expect(trip.date).to.equal("2022/09/16")
    expect(trip.duration).to.equal(8)
    expect(trip.status).to.equal("approved")
  });
});
