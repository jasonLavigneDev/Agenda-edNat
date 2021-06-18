import sinon from 'sinon';
import { Factory } from 'meteor/dburles:factory';

export const randomBoolean = () => Boolean(Math.round(Math.random()));

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
