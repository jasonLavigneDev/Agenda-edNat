import { Meteor } from 'meteor/meteor';
import { isActive } from '../../utils/functions';
import Groups from '../groups';

Meteor.publish('groups.member', function groupMember() {
  if (!isActive(this.userId)) {
    return this.ready();
  }
  return Groups.find(
    {
      $or: [{ admins: this.userId }, { animators: this.userId }, { members: this.userId }],
    },
    { fields: Groups.publicFields, limit: 100, sort: { name: -1 } },
  );
});

Meteor.publish('groups.list', function groupsList({ groupsIds }) {
  if (!isActive(this.userId)) {
    return this.ready();
  }
  return Groups.find({ _id: { $in: groupsIds } }, { fields: Groups.publicFields, limit: 100, sort: { name: -1 } });
});
