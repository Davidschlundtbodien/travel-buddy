import chai from 'chai';
const expect = chai.expect;
import trips from './sample-data/trips';
import Trip from '../src/classes/Trip'
import TripRepository from '../src/classes/TripRepository';

describe('TripRepository', () => {
  let tripRepo

  beforeEach(() => {
    tripRepo = new TripRepository(trips)
  });

  it('should be a function', () => {
    expect(TripRepository).to.be.a('function');
  });

  it('should contain a collection of trips', () => {
    expect(tripRepo.trips[0]).to.be.an.instanceof(Trip)
    expect(tripRepo.trips[1].travelers).to.equal(5)
  });

  it('should find trips for a specific userID', () => {
    let userTrips = tripRepo.filterUserTrips(24)
    expect(userTrips.length).to.equal(3)
  });

});
