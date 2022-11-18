import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { _ } from 'meteor/underscore';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import AppSettings from './appsettings';

// eslint-disable-next-line import/prefer-default-export
export const getAppSettingsLinks = new ValidatedMethod({
  name: 'appSettings.getAppSettingsLinks',
  validate: null,
  run() {
    try {
      return AppSettings.findOne({ _id: 'settings' }, { fields: AppSettings.links });
    } catch (error) {
      throw new Meteor.Error(error, error);
    }
  },
});

// Get list of all method names on User
const LISTS_METHODS = _.pluck([getAppSettingsLinks], 'name');

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
