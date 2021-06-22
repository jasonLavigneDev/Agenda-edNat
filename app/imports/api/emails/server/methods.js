import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import ical from 'ical-generator';

import Events from '../../events/events';
import { eventTemplate } from './templates';
import ROUTES from '../../../ui/layouts/routes';

Meteor.startup(() => {
  const { url } = Meteor.settings.private.smtp;
  process.env.MAIL_URL = url;
});

const sendEmail = new ValidatedMethod({
  name: 'emails.sendEventNotification',
  validate: new SimpleSchema({
    event: Events.schema.omit('createdAt', 'updatedAt', 'userId'),
  }).validator({ clean: true }),

  run({ event }) {
    const cal = ical({ domain: process.env.ROOT_URL, name: 'event iCal' });
    cal.createEvent({
      start: moment(event.start),
      end: moment(event.end),
      location: event.location,
      summary: event.title,
      description: event.description,
      url: ROUTES.EVENT_MAKE(event._id),
    });
    const user = Meteor.users.findOne(this.userId);
    const html = eventTemplate({
      title: event.title,
      description: event.description,
      start: moment(event.start).format('LLL'),
      end: moment(event.end).format('LLL'),
      sender: user && user.emails[0].address,
    });

    return event.guests.forEach((guest) => {
      return Email.send({
        to: guest,
        from: Meteor.settings.private.smtp.fromEmail,
        subject: `Laboite - Agenda - Votre rdv du ${moment(event.start).format('L')}`,
        icalEvent: cal.toString(),
        inReplyTo: Meteor.settings.private.smtp.toEmail,
        html,
      });
    });
  },
});

export default sendEmail;
