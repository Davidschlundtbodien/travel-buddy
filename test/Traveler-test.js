import chai from 'chai';
const expect = chai.expect;
import travelers from './sample-data/travelers';
import Traveler from '../src/classes/Traveler';

describe('Traveler', () => {
  let traveler

  beforeEach(() => {
    traveler = new Traveler(travelers[0])
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
});
