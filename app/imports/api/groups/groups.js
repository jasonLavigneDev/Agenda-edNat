import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const Groups = new Mongo.Collection('groups');

// Deny all client-side updates since we will be using methods to manage this collection
Groups.deny({
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

Groups.schema = new SimpleSchema(
  {
    name: {
      type: String,
      index: true,
      unique: true,
      min: 1,
      max: 60,
    },
    slug: {
      type: String,
      index: true,
      unique: true,
      min: 1,
    },
    description: {
      type: String,
      optional: true,
    },
    content: {
      type: String,
      optional: true,
    },
    active: { type: Boolean },
    groupPadID: {
      type: String,
      optional: true,
    },
    digest: {
      type: String,
      optional: true,
    },
    type: {
      type: SimpleSchema.Integer,
      allowedValues: [0, 5, 10], // 0 Ouvert, 5 Modéré, 10 Fermé
    },
    applications: {
      type: Array,
      optional: true,
    },
    'applications.$': {
      type: String,
    },
    owner: {
      type: String,
      regEx: SimpleSchema.RegEx.Id,
    },
    admins: {
      type: Array,
      defaultValue: [],
    },
    'admins.$': { type: String, regEx: SimpleSchema.RegEx.Id },
    animators: {
      type: Array,
      defaultValue: [],
    },
    'animators.$': { type: String, regEx: SimpleSchema.RegEx.Id },
    members: {
      type: Array,
      defaultValue: [],
    },
    'members.$': { type: String, regEx: SimpleSchema.RegEx.Id },
    candidates: {
      type: Array,
      defaultValue: [],
    },
    'candidates.$': { type: String, regEx: SimpleSchema.RegEx.Id },
    numCandidates: {
      type: Number,
      defaultValue: 0,
    },
    plugins: {
      type: Object,
      defaultValue: {},
      optional: true,
      blackbox: true,
    },
  },
  { tracker: Tracker },
);

Groups.typeLabels = {
  0: 'api.groups.types.open',
  5: 'api.groups.types.moderated',
  10: 'api.groups.types.private',
};

Groups.publicFields = {
  name: 1,
  slug: 1,
  description: 1,
  active: 1,
  groupPadID: 1,
  digest: 1,
  type: 1,
  owner: 1,
  numCandidates: 1,
  plugins: 1,
  animators: 1,
  admins: 1,
  members: 1,
};
Groups.allPublicFields = {
  content: 1,
  applications: 1,
  ...Groups.publicFields,
};

Groups.attachSchema(Groups.schema);

export default Groups;
