import i18n from 'meteor/universe:i18n';
import { useTracker } from 'meteor/react-meteor-data';
import moment from 'moment';
import importICS from 'node-ical';
import exportICS from 'ical-generator';
import Events from '../../../../api/events/events';
import { editEvent, createEvent } from '../../../../api/events/methods';

export const BUTTONS_TEXTS = () => ({
  today: i18n.__('components.Calendar.today'),
  listDay: i18n.__('components.Calendar.listDay'),
  timeGridDay: i18n.__('components.Calendar.timeGridDay'),
  listWeek: i18n.__('components.Calendar.listWeek'),
  timeGridWeek: i18n.__('components.Calendar.timeGridWeek'),
  dayGridMonth: i18n.__('components.Calendar.dayGridMonth'),
});

export const CUSTOM_BUTTONS = ({ importFunc, exportFunc, weekendFunc }) => ({
  import: {
    text: i18n.__('components.Calendar.importButton'),
    click: importFunc,
  },
  export: {
    text: i18n.__('components.Calendar.exportButton'),
    click: exportFunc,
  },
  displayWeekEnds: {
    text: i18n.__('components.Calendar.displayWeekendButton'),
    click: weekendFunc,
  },
});

export const TOOLBAR = {
  left: 'timeGridDay,timeGridWeek,dayGridMonth,listWeek displayWeekEnds',
  center: 'title',
  right: 'prev,today,next import,export',
};

export const useEvents = (datesRange) =>
  useTracker(() => {
    Meteor.subscribe('events.user', datesRange);
    const events = Events.find().fetch();
    return events;
  });

export const eventDropOrResize = (info) => {
  const {
    delta,
    endDelta,
    startDelta,
    event: {
      _def: {
        extendedProps: { recurrent, _id, userId },
      },
    },
    revert,
  } = info;
  if (recurrent) {
    revert();
    return msg.warning(i18n.__('components.Calendar.cantMoveRecurrent'));
  }
  if (userId !== Meteor.userId()) {
    revert();
    return msg.warning(i18n.__('components.Calendar.youareNotAuthorized'));
  }

  const event = Events.findOne({ _id });
  event.start = moment(event.start)
    .add(startDelta ? startDelta.days : delta.days, 'days')
    .add(startDelta ? startDelta.milliseconds : delta.milliseconds, 'milliseconds')
    .format();
  event.end = moment(event.end)
    .add(endDelta ? endDelta.days : delta.days, 'days')
    .add(endDelta ? endDelta.milliseconds : delta.milliseconds, 'milliseconds')
    .format();
  if (moment(event.start).isBefore(moment())) {
    revert();
    return msg.warning(i18n.__('pages.AddEvent.startDateMustBeAfterToday'));
  }
  return editEvent.call({ data: event }, (error) => {
    if (error) {
      msg.error(error.reason);
    } else {
      msg.success(i18n.__('pages.EditEvent.eventCreated'));
    }
  });
};

/** *****************Export Ical file ******************* */
export const exportAgendaToICS = (events = []) => {
  // Create new Calendar and set optional fields

  const cal = exportICS({
    domain: window.location.hostname,
    prodId: { company: window.location.hostname, product: 'ical-generator' },
    name: '<agenda>',
  }).timezone('Europe/Paris');
  // value events when create in calendar

  // Find event in array
  events.forEach((line) => {
    cal.createEvent({
      start: line.start,
      end: line.end,
      timestamp: moment(),
      summary: line.title,
      description: line.description,
      allDay: line.allDay,
      location: line.location,
      uid: line._id,
    });
  });

  // Create link for download ics file
  const blob = new Blob([cal], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.setAttribute('style', 'display: none');
  a.href = url;
  a.download = 'download.ics';
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
};

/** ************************************************** */

/** *****************Import ICS file ******************* */
export const importICSToAgenda = (eFiles) => {
  const { files } = eFiles.target;
  if (files.lenght === 0) return;
  const fileToRead = files[0];
  const reader = new FileReader();
  reader.onload = async (eFile) => {
    const file = eFile.target.result;

    // Parse
    const parseF = importICS.sync.parseICS(file);
    // eslint-disable-next-line no-restricted-syntax
    for (const k in parseF) {
      // eslint-disable-next-line no-prototype-builtins
      if (parseF.hasOwnProperty(k)) {
        if (parseF[k].type === 'VEVENT') {
          const ev = parseF[k];
          let allDayImport = false;
          // Evenement toute la journée ou pas
          if (moment(ev.start).format('HH:mm:ss') === moment(ev.end).format('HH:mm:ss')) {
            allDayImport = true;
          }
          const title = ev.summary;
          const { location } = ev;
          // eslint-disable-next-line prefer-destructuring
          const description = ev.description;
          const start = moment(ev.start).format();
          const end = moment(ev.end).format();

          createEvent.call(
            {
              data: {
                title,
                location,
                start,
                allDay: allDayImport,
                end,
                description,
              },
            },
            (error) => {
              if (error) {
                msg.error(error.reason);
              } else {
                msg.success(i18n.__('pages.AddEvent.eventCreated'));
              }
            },
          );
        }
      }
    }
  };

  reader.onerror = (e) => msg.error(e.target.error.name);

  reader.readAsText(fileToRead);
};
