import { Factory } from 'meteor/dburles:factory';
import { Random } from 'meteor/random';
import faker from 'faker';
import Groups from '../../imports/api/groups/groups';

Factory.define('group', Groups, {
  active: true,
  type: 0,
  name: () => faker.company.companyName(),
  slug: () => faker.company.companyName(),
  owner: () => Random.id(),
  admins: () => [Random.id()],
  animators: () => [Random.id(), Random.id()],
  members: () => [Random.id(), Random.id()],
  candidates: () => [Random.id()],
});
