import chai from 'chai';
const expect = chai.expect;
import destinations from './sample-data/destinations';
import Destination from '../src/classes/Destination'
import DestinationRepository from '../src/classes/DestinationRepository';

describe('DestinationRepository', () => {
  let destinationRepo

  beforeEach(() => {
    destinationRepo = new DestinationRepository(destinations)
  });

  it('should be a function', () => {
    expect(DestinationRepository).to.be.a('function');
  });

  it('should contain a collection of destinations', () => {
    expect(destinationRepo.destinations[0]).to.be.an.instanceof(Destination)
    expect(destinationRepo.destinations[1].estimatedLodgingCostPerDay).to.equal(100)
  });

});
