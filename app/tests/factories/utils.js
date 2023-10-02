import sinon from 'sinon';
import { Factory } from 'meteor/dburles:factory';
import EVENTS_COLOR from '../../imports/ui/utils/eventsColor';

export const randomBoolean = () => Boolean(Math.round(Math.random()));

export const randomEventColor = () => {
  const tableTemp = Object.keys(EVENTS_COLOR);
  const random = Math.round(Math.random() * Object.keys(EVENTS_COLOR).length + 1);
  return tableTemp[random];
};

sinon.stub(Meteor, 'user');
sinon.stub(Meteor, 'userId');

export const changeCurrentUser = (user) => {
  if (user === 'none') {
    Meteor.user.returns(null); // now Meteor.user() will return the user we just created
    Meteor.userId.returns(null); // needed in methods
    return null;
  }
  const currentUser = user || Factory.create('user');
  Meteor.user.returns(currentUser); // now Meteor.user() will return the user we just created
  Meteor.userId.returns(currentUser._id); // needed in methods
  return currentUser;
};
