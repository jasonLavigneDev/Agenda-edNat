import { Meteor } from 'meteor/meteor';
import { isActive } from '../../utils/functions';
import Events from '../events';

Meteor.publish('events.user', function eventsUser({ start, end }) {
  if (!isActive(this.userId)) {
    return this.ready();
  }
  return Events.find({
    $and: [
      { $or: [{ userId: this.userId }, { participants: { $elemMatch: { _id: this.userId } } }] },
      {
        $or: [
          { start: { $gte: start, $lte: end } },
          { end: { $gte: start, $lte: end } },
          { startRecur: { $lte: start } },
          { endRecur: { $lte: end } },
        ],
      },
    ],
  });
});
Meteor.publish('events.getOne', function eventsUser({ _id }) {
  if (!isActive(this.userId)) {
    return this.ready();
  }
  return Events.find({ _id });
});
