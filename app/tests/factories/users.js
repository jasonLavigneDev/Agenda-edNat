import { Factory } from 'meteor/dburles:factory';

import faker from 'faker';

Factory.define('user', Meteor.users, {
  emails: [{ address: faker.internet.email(), verified: true }],
  username: faker.internet.userName(),
  structure: faker.company.companyName(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  isActive: true,
});
