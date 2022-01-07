import { Meteor } from 'meteor/meteor';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import i18n from 'meteor/universe:i18n';

import { isActive } from '../utils/functions';
import Events from './events';

export const createEvent = new ValidatedMethod({
  name: 'events.create',
  validate: new SimpleSchema({
    data: Events.schema.omit('createdAt', 'updatedAt', 'userId', '_id'),
  }).validator({ clean: true }),

  run({ data }) {
    try {
      if (!isActive(this.userId)) {
        throw new Meteor.Error('api.events.create.notLoggedIn', i18n.__('api.users.notLoggedIn'));
      }
      const result = Events.insert(data);
      if (result && Meteor.isServer && !Meteor.isTest) {
        // eslint-disable-next-line global-require
        const sendnotif = require('../notifications/server/notifSender').default;
        // eslint-disable-next-line global-require
        const sendEmail = require('../emails/server/methods').default;
        if (data.participants && data.participants.filter((p) => p._id !== this.userId).length) {
          sendnotif({
            groups: data.groups,
            participants: data.participants.filter((p) => p._id !== this.userId),
            title: i18n.__('notifications.newMeetingEvent'),
            content: `${i18n.__('notifications.youAreInvitedTo')} ${data.title}`,
            eventId: result,
          });
        }
        if (data.guests && data.guests.length) {
          sendEmail.call({ event: data });
        }
      }
      return result;
    } catch (error) {
      throw new Meteor.Error(error.code, error.message);
    }
  },
});

// export const allUsersGroup = new ValidatedMethod({
//   name: 'events.allUsers',
//   validate: new SimpleSchema({
//     arrayAdmins: { type: Array },
//     'arrayAdmins.$': { type: String },
//   }).validator({ clean: true }),
//   run({ arrayAdmins }) {
//     const user = Meteor.users.find({ _id: { $in: arrayAdmins } }, { fields: { _id: 1, emails: 1 } }).fetch();
//     return user;
//   },
// });

export const editEvent = new ValidatedMethod({
  name: 'events.edit',
  validate: new SimpleSchema({
    data: Events.schema.omit('createdAt', 'updatedAt', 'userId'),
  }).validator({ clean: true }),

  run({ data }) {
    try {
      const event = Events.findOne({ _id: data._id }, { fields: { userId: 1 } });
      if (!isActive(this.userId)) {
        throw new Meteor.Error('api.events.edit.notLoggedIn', i18n.__('api.users.notLoggedIn'));
      } else if (event && event.userId !== this.userId) {
        throw new Meteor.Error('api.events.edit.notOwner', i18n.__('api.users.mustBeOwner'));
      }
      const result = Events.update({ _id: data._id }, { $set: { ...data } });
      if (result && Meteor.isServer && !Meteor.isTest) {
        // eslint-disable-next-line global-require
        const sendnotif = require('../notifications/server/notifSender').default;
        // eslint-disable-next-line global-require
        const sendEmail = require('../emails/server/methods').default;
        if (data.participants && data.participants.filter((p) => p._id !== this.userId).length) {
          sendnotif({
            groups: data.groups,
            participants: data.participants.filter((p) => p._id !== this.userId),
            title: i18n.__('notifications.newMeetingEvent'),
            content: `${i18n.__('notifications.youAreInvitedTo')} ${data.title}`,
            eventId: result,
          });
        }
        if (data.guests && data.guests.length) {
          sendEmail.call({ event: data });
        }
      }
      return result;
    } catch (error) {
      throw new Meteor.Error(error.code, error.message);
    }
  },
});
export const deleteEvent = new ValidatedMethod({
  name: 'events.delete',
  validate: new SimpleSchema({
    eventId: String,
  }).validator({ clean: true }),

  run({ eventId }) {
    try {
      const event = Events.findOne({ _id: eventId }, { fields: { userId: 1 } });
      if (!isActive(this.userId)) {
        throw new Meteor.Error('api.events.edit.notLoggedIn', i18n.__('api.users.notLoggedIn'));
      } else if (event && event.userId !== this.userId) {
        throw new Meteor.Error('api.events.edit.notOwner', i18n.__('api.users.mustBeOwner'));
      }
      return Events.remove({ _id: eventId });
    } catch (error) {
      throw new Meteor.Error(error.code, error.message);
    }
  },
});

export const changeUserStatus = new ValidatedMethod({
  name: 'events.changeUserStatus',
  validate: new SimpleSchema({
    eventId: String,
    status: Number,
  }).validator({ clean: true }),

  run({ eventId, status }) {
    try {
      const event = Events.findOne({ _id: eventId }) || {};
      if (!isActive(this.userId)) {
        throw new Meteor.Error('api.events.edit.notLoggedIn', i18n.__('api.users.notLoggedIn'));
      }
      const participants = event.participants.map((p) => ({
        ...p,
        status: p._id === this.userId ? status : p.status,
      }));
      Events.update({ _id: eventId }, { $set: { participants } });
      return Events.findOne({ _id: eventId });
    } catch (error) {
      throw new Meteor.Error(error.code, error.message);
    }
  },
});

// Get list of all method names on User
const LISTS_METHODS = _.pluck([createEvent, deleteEvent, editEvent, changeUserStatus], 'name');

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
