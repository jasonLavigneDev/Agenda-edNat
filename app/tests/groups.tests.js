/* eslint-env mocha */
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { Factory } from 'meteor/dburles:factory';
import { assert } from 'chai';

import { changeCurrentUser } from './factories/utils';

import Groups from '../imports/api/groups/groups';
import '../imports/api/groups/server/publications';

describe('groups', function groupTests() {
  describe('mutators', function groupMutators() {
    it('builds correctly from factory', function groupFactory() {
      const group = Factory.create('group');
      assert.typeOf(group, 'object');
    });
  });

  describe('publications', function groupPublications() {
    let currentUser;
    let anotherUser;
    let Ids;
    beforeEach(function beforeTesting() {
      Groups.remove({});
      Meteor.users.remove({});
      anotherUser = changeCurrentUser();
      currentUser = changeCurrentUser();
      Ids = [Random.id(), Random.id(), Random.id(), Random.id(), Random.id()];
      Ids.forEach((_id) => {
        Factory.create('group', {
          _id,
        });
      });
      Factory.create('group', {
        members: [anotherUser._id],
      });
    });

    describe('groups.member', function groupsForUserPub() {
      it('sends all groups for the currentUser', function groupsMembersPubTest(done) {
        const collector = new PublicationCollector({ userId: anotherUser._id });
        collector.collect('groups.member', {}, (collections) => {
          assert.equal(collections.groups.length, 1);
          done();
        });
      });
    });
    describe('groups.list', function groupsForUserPub() {
      it('sends all groups from a list of ids', function groupsListPubTest(done) {
        const groupsIds = [Ids[0], Ids[2], Ids[4]];
        const collector = new PublicationCollector({ userId: anotherUser._id });
        collector.collect('groups.list', { groupsIds }, (collections) => {
          assert.equal(collections.groups.length, 3);
          done();
        });
      });
    });
  });
});
