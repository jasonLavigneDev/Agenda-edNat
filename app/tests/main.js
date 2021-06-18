import assert from 'assert';
import './factories/index';
import './events.tests';

describe('agenda3', function describeAgenda() {
  it('package.json has correct name', async function getNameFromPackage() {
    const { name } = await import('../package.json');
    assert.strictEqual(name, 'agenda3');
  });

  if (Meteor.isClient) {
    it('client is not server', function isItTheClient() {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it('server is not client', function isItTheServer() {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});
