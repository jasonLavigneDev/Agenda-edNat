import i18n from 'meteor/universe:i18n';

const EVENTS_COLOR = {
  [i18n.__('eventType.rdv')]: '#3788D8',
  [i18n.__('eventType.prefere')]: '#00bcd4',
  [i18n.__('eventType.project')]: '#4caf50',
  [i18n.__('eventType.problems')]: '#009688',
  [i18n.__('eventType.suivi')]: '#cddc39',
  [i18n.__('eventType.perso')]: '#A8470A',
  [i18n.__('eventType.meeting')]: '#DB9F53',
  [i18n.__('eventType.divers')]: '#ff5722',
  [i18n.__('eventType.ferie')]: '#e91e63',
  [i18n.__('eventType.call')]: '#9c27b0',
  [i18n.__('eventType.conge')]: '#673ab7',
};

export default EVENTS_COLOR;
