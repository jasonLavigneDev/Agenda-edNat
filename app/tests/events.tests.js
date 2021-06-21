/* eslint-env mocha */
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { Factory } from 'meteor/dburles:factory';
import { assert } from 'chai';
import moment from 'moment';

import { changeCurrentUser } from './factories/utils';

import Events from '../imports/api/events/events';
import '../imports/api/events/server/publications';
import { createEvent, deleteEvent, editEvent } from '../imports/api/events/methods';

describe('event', function eventTests() {
  describe('mutators', function eventMutators() {
    it('builds correctly from factory', function eventFactory() {
      const event = Factory.create('event');
      assert.typeOf(event, 'object');
    });
  });
  describe('publications', function eventPublications() {
    let currentUser;
    let oneEventID;
    beforeEach(function beforeTesting() {
      Events.remove({});
      Meteor.users.remove({});
      currentUser = changeCurrentUser();
      oneEventID = Random.id();
      [0, 3, 4, 5, 9].forEach((i) => {
        Factory.create('event', {
          _id: i === 0 ? oneEventID : Random.id(),
          userId: currentUser._id,
          start: moment().add(i, 'days').format(),
          end: moment().add(i, 'days').add(1, 'hour').format(),
        });
      });
    });
    describe('events.user', function eventsForUserPub() {
      it('sends all event for this month', function nextMonthEvents(done) {
        const collector = new PublicationCollector({ userId: currentUser._id });
        collector.collect(
          'events.user',
          {
            start: new Date(moment().add(-1, 'days').format()),
            end: new Date(moment().add(1, 'months').format()),
          },
          (collections) => {
            assert.equal(collections.eventsAgenda.length, 5);
            done();
          },
        );
      });
      it('sends all event for this week', function nextweekEvents(done) {
        const collector = new PublicationCollector({ userId: currentUser._id });
        collector.collect(
          'events.user',
          {
            start: new Date(moment().add(-1, 'days').format()),
            end: new Date(moment().add(1, 'weeks').format()),
          },
          (collections) => {
            assert.equal(collections.eventsAgenda.length, 4);
            done();
          },
        );
      });
      it('sends all event for today', function nextweekEvents(done) {
        const collector = new PublicationCollector({ userId: currentUser._id });
        collector.collect(
          'events.user',
          {
            start: new Date(moment().add(-1, 'days').format()),
            end: new Date(moment().add(1, 'days').format()),
          },
          (collections) => {
            assert.equal(collections.eventsAgenda.length, 1);
            done();
          },
        );
      });
      it('sends one event', function nextweekEvents(done) {
        const collector = new PublicationCollector({ userId: currentUser._id });
        collector.collect('events.getOne', { _id: oneEventID }, (collections) => {
          assert.equal(collections.eventsAgenda.length, 1);
          done();
        });
      });
    });
  });
  describe('methods', function eventMethodsTests() {
    let currentUser;
    let anotherUser;
    let oneEventID;
    beforeEach(function beforeTesting() {
      Events.remove({});
      Meteor.users.remove({});
      anotherUser = changeCurrentUser();
      currentUser = changeCurrentUser();
      oneEventID = Random.id();
      [0, 3, 4, 5, 9].forEach((i) => {
        Factory.create('event', {
          _id: i === 0 ? oneEventID : Random.id(),
          userId: currentUser._id,
          start: moment().add(i, 'days').format(),
          end: moment().add(i, 'days').add(1, 'hour').format(),
        });
      });
    });

    describe('createEvent', function createEventTest() {
      it('does create an event with a connected user', function createEventSuccess() {
        const title = 'magic unicorn meeting';
        createEvent._execute(
          { userId: currentUser._id },
          {
            data: Factory.create('event', {
              title,
              participants: [],
              guests: [],
            }),
          },
        );

        const event = Events.findOne({ title });
        assert.typeOf(event, 'object');
      });
      it('does not create an event without a connected user', function notConnectedError() {
        // Throws if logged out user, tries to create an event
        assert.throws(
          () => {
            createEvent._execute(
              { userId: null },
              {
                data: Factory.create('event'),
              },
            );
          },
          Meteor.Error,
          /api.events.create.notLoggedIn/,
        );
      });
    });
    describe('editEvent', function editEventTest() {
      it('does edit an event with a connected user', function editEventSuccess() {
        const title = 'that awesome event';
        editEvent._execute(
          { userId: currentUser._id },
          {
            data: {
              ...Events.findOne({ _id: oneEventID }),
              title,
              userId: currentUser._id,
            },
          },
        );

        const event = Events.findOne({ title });
        assert.typeOf(event, 'object');
      });
      it('does not edit an event without a connected user', function notConnectedError() {
        // Throws if logged out user tries to edit an event
        assert.throws(
          () => {
            editEvent._execute(
              { userId: null },
              {
                data: {
                  ...Events.findOne({ _id: oneEventID }),
                  title: 'woap',
                },
              },
            );
          },
          Meteor.Error,
          /api.events.edit.notLoggedIn/,
        );
      });
      it('does not edit an event without the owner', function notTheOwnerError() {
        // Throws if another user than the owner tries to edit an event
        changeCurrentUser(anotherUser);
        assert.throws(
          () => {
            editEvent._execute(
              { userId: anotherUser._id },
              {
                data: {
                  ...Events.findOne({ _id: oneEventID }),
                  title: 'woap',
                },
              },
            );
          },
          Meteor.Error,
          /api.events.edit.notOwner/,
        );
      });
    });
    describe('deleteEvent', function deleteEventTest() {
      it('does delete an event with a connected user', function deleteEventSuccess() {
        const title = 'that awesome event';
        deleteEvent._execute(
          { userId: currentUser._id },
          {
            eventId: oneEventID,
          },
        );

        const event = Events.findOne({ title });
        assert.typeOf(event, 'undefined');
      });
      it('does not delete an event without a connected user', function notConnectedError() {
        // Throws if logged out user tries to delete an event
        assert.throws(
          () => {
            deleteEvent._execute(
              { userId: null },
              {
                eventId: oneEventID,
              },
            );
          },
          Meteor.Error,
          /api.events.edit.notLoggedIn/,
        );
      });
      it('does not delete an event without the owner', function notTheOwnerError() {
        // Throws if another user than the owner tries to delete an event
        changeCurrentUser(anotherUser);
        assert.throws(
          () => {
            deleteEvent._execute(
              { userId: anotherUser._id },
              {
                eventId: oneEventID,
              },
            );
          },
          Meteor.Error,
          /api.events.edit.notOwner/,
        );
      });
    });
  });
});
