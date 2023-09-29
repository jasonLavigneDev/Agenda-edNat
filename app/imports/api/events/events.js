import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import moment from 'moment';
import { getLabel } from '../utils/functions';

export const EventsAgenda = new Mongo.Collection('eventsAgenda');

EventsAgenda.deny({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  },
});

const settingsGroup = new SimpleSchema({
  _id: {
    type: String,
    min: 1,
  },
  name: {
    type: String,
  },
  type: {
    type: SimpleSchema.Integer,
  },
});

const settingsParticipant = new SimpleSchema({
  _id: {
    type: String,
    min: 1,
  },
  email: {
    type: String,
  },
  status: {
    type: Number,
    allowedValues: [0, 1, 2], // 0: refused - 1: waiting - 2: accepted
    defaultValue: 1,
  },
  groupId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
});

EventsAgenda.schema = new SimpleSchema(
  {
    _id: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      min: 1,
    },
    eventType: {
      type: String,
    },
    title: {
      type: String,
    },
    location: {
      type: String,
      optional: true,
    },
    recurrent: {
      type: Boolean,
      defaultValue: false,
    },
    daysOfWeek: {
      type: Array,
      optional: true,
    },
    'daysOfWeek.$': {
      type: Number,
      optional: true,
    },
    description: {
      type: String,
      optional: true,
    },
    // startRecur: {
    //   type: Date,
    //   optional: true,
    // },
    // endRecur: {
    //   type: Date,
    //   optional: true,
    // },
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
    startTime: {
      type: String,
      optional: true,
      autoValue() {
        if (!this.field('allDay').value && this.field('recurrent').value) {
          return moment(this.field('start').value).format('HH:mm');
        }
        return this.unset() || null;
      },
    },
    endTime: {
      type: String,
      optional: true,
      autoValue() {
        if (!this.field('allDay').value && this.field('recurrent').value) {
          return moment(this.field('end').value).format('HH:mm');
        }
        return this.unset() || null;
      },
    },
    allDay: {
      type: Boolean,
      defaultValue: false,
    },
    groups: {
      type: Array,
      defaultValue: [],
    },
    'groups.$': {
      type: settingsGroup,
      optional: true,
    },
    participants: {
      type: Array,
      defaultValue: [],
    },
    'participants.$': {
      type: settingsParticipant,
      optional: true,
    },
    guests: {
      type: Array,
      defaultValue: [],
    },
    'guests.$': {
      type: String,
      optional: true,
    },
    userId: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
      autoValue() {
        if (this.isInsert) {
          return this.userId;
        }
        return this.value;
      },
    },
    createdAt: {
      type: Date,
      label: getLabel('api.articles.labels.createdAt'),
      optional: true,
      autoValue() {
        if (this.isInsert) {
          return new Date();
        }
        return this.value;
      },
    },
    updatedAt: {
      type: Date,
      label: getLabel('api.articles.labels.updatedAt'),
      autoValue() {
        return new Date();
      },
    },
  },
  { tracker: Tracker },
);

EventsAgenda.publicFields = {
  title: 1,
  location: 1,
  description: 1,
  recurrent: 1,
  startRecur: 1,
  endRecur: 1,
  daysOfWeek: 1,
  start: 1,
  end: 1,
  allDay: 1,
  group: 1,
  participants: 1,
  guests: 1,
  authorId: 1,
  color: 1,
};

EventsAgenda.attachSchema(EventsAgenda.schema);

export default EventsAgenda;
