import chai from 'chai';
const expect = chai.expect;
import travelers from './sample-data/travelers';
import trips from './sample-data/trips';
import destinations from './sample-data/destinations';
import Traveler from '../src/classes/Traveler';
import TripRepository from '../src/classes/TripRepository'
import DestinationRepository from '../src/classes/DestinationRepository';


describe('Traveler', () => {
  let traveler, tripRepo, destinationRepo

  beforeEach(() => {
    destinationRepo = new DestinationRepository(destinations)
    tripRepo = new TripRepository(trips)
    traveler = new Traveler(travelers[0], tripRepo)
  });

  it('should be a function', () => {
    expect(Traveler).to.be.a('function')
  });

  it('should intialize a traveler object', () => {
    expect(traveler).to.be.an.instanceof(Traveler)
    expect(traveler.id).to.equal(1)
    expect(traveler.name).to.equal('Ham Leadbeater')
    expect(traveler.type).to.equal('relaxer')
  })

  it('should store respective trips', () => {
    expect(traveler.trips.length).to.equal(2)
  });

  it('should calculate total cost of all trips', () => {
    expect(traveler.calculateTotalSpent(destinationRepo)).to.equal(6616.5)
  })
});
