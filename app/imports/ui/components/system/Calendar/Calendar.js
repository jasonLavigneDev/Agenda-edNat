import React, { useRef, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { useHistory } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import moment from 'moment';

import { useAppContext } from '../../../contexts/context';
import { useToggle } from '../../../../api/utils/hooks';
import {
  BUTTONS_TEXTS,
  CUSTOM_BUTTONS,
  TOOLBAR,
  useEvents,
  eventDropOrResize,
  exportAgendaToICS,
  importICSToAgenda,
} from './utils';
import useCalendarStyles from './style';
import ROUTES from '../../../layouts/routes';
import EVENTS_COLOR from '../../../utils/eventsColor';

const plugins = [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin];

const Calendar = () => {
  const [{ language, isMobile }] = useAppContext();
  const [weekends, toggleWeekends] = useToggle();
  const [datesRange, setDatesRange] = useState({});
  const inputRef = useRef();
  const history = useHistory();
  const classes = useCalendarStyles(isMobile)();

  const buttons = useTracker(() => BUTTONS_TEXTS(), [language]);

  const addEventToDate = ({ dateStr, endStr, startStr }) => {
    return history.push(
      ROUTES.ADD_EVENT_TO_DATE({
        date: dateStr,
        end: endStr,
        start: startStr,
      }),
    );
  };

  const changeViewDates = ({ start, end }) => {
    setDatesRange({ start, end });
  };

  const events = useEvents(datesRange);

  events.forEach((event) => {
    // eslint-disable-next-line no-param-reassign
    event.color = EVENTS_COLOR[event.eventType];
  });

  const customButtons = CUSTOM_BUTTONS({
    importFunc: () => inputRef.current.click(),
    exportFunc: () => exportAgendaToICS(events),
    weekendFunc: toggleWeekends,
  });

  const eventClick = ({
    event: {
      _def: {
        extendedProps: { _id },
      },
    },
  }) => {
    history.push(ROUTES.EVENT_MAKE(_id));
  };

  const renderEventContent = (info) => {
    info.el.setAttribute('title', info.event.extendedProps.description || info.event.title);
  };

  return (
    <div className={classes.container}>
      <input
        ref={inputRef}
        onChange={importICSToAgenda}
        className={classes.hidden}
        id="myfile"
        type="file"
        accept=".ics"
      />
      <FullCalendar
        locale={language}
        timeZone="local"
        eventAllow={() => true}
        plugins={plugins}
        eventClick={eventClick}
        businessHours={[
          {
            daysOfWeek: weekends ? [1, 2, 3, 4, 5, 6, 7] : [1, 2, 3, 4, 5],
            startTime: '08:00',
            endTime: '18:00',
          },
        ]}
        datesSet={changeViewDates}
        initialDate={moment().format()}
        slotDuration="00:15:00"
        dayHeaderFormat={{
          weekday: isMobile ? 'short' : 'long',
          omitCommas: true,
        }}
        dateClick={addEventToDate}
        select={addEventToDate}
        weekends={weekends}
        events={events}
        editable
        selectable
        eventDrop={eventDropOrResize}
        eventResize={eventDropOrResize}
        height={isMobile ? 'auto' : 1000}
        firstDay={1}
        nowIndicator
        buttonText={buttons}
        customButtons={customButtons}
        headerToolbar={TOOLBAR}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'short',
        }}
        eventDidMount={renderEventContent}
      />
    </div>
  );
};

export default Calendar;
