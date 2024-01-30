import { Factory } from 'meteor/dburles:factory';

import { faker } from '@faker-js/faker';

Factory.define('user', Meteor.users, {
  emails: () => [{ address: faker.internet.email(), verified: true }],
  username: () => faker.internet.userName(),
  structure: () => faker.company.name(),
  firstName: () => faker.person.firstName(),
  lastName: () => faker.person.lastName(),
  isActive: () => true,
});
