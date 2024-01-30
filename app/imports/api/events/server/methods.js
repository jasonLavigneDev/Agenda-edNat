/* eslint-disable import/prefer-default-export */
import { Meteor } from 'meteor/meteor';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import i18n from 'meteor/universe:i18n';

import { isActive } from '../../utils/functions';
import { _createEvent } from '../methods';
import Events from '../events';

export const getEvent = new ValidatedMethod({
  name: 'events.get',
  validate: new SimpleSchema({
    _id: String,
  }).validator({ clean: true }),

  run({ _id }) {
    try {
      if (!isActive(this.userId)) {
        throw new Meteor.Error('api.events.get.notLoggedIn', i18n.__('api.users.mustBeLoggedIn'));
      }
      return Events.findOne({ _id });
    } catch (error) {
      throw new Meteor.Error(error.code, error.message);
    }
  },
});

export const importEvents = new ValidatedMethod({
  name: 'events.import',
  // data will be validated on the fly in the run method because
  // validating all data at once here was taking a looooot of time
  validate: null,

  run({ data }) {
    try {
      if (!isActive(this.userId)) {
        throw new Meteor.Error('api.events.import.notLoggedIn', i18n.__('api.users.notLoggedIn'));
      }
      const evtSchema = Events.schema.omit('createdAt', 'updatedAt', 'userId', '_id');
      data.forEach((event) => {
        const validatedEvent = evtSchema.clean(event);
        _createEvent(validatedEvent);
      });
    } catch (error) {
      throw new Meteor.Error(error.code, error.message);
    }
  },
});

// Get list of all method names on User
const LISTS_METHODS = _.pluck([getEvent, importEvents], 'name');

if (Meteor.isServer) {
  // Only allow 5 list operations per connection per second
  DDPRateLimiter.addRule(
    {
      name(name) {
        return _.contains(LISTS_METHODS, name);
      },

      // Rate limit per connection ID
      connectionId() {
        return true;
      },
    },
    5,
    1000,
  );
}
