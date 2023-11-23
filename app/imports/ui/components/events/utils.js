import React, { useEffect } from 'react';
import moment from 'moment';
import i18n from 'meteor/universe:i18n';
import { useObjectState } from '../../../api/utils/hooks';
import EVENTS_COLOR from '../../utils/eventsColor';

export const initialState = {
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  title: '',
  description: '',
  location: '',
  allDay: false,
  recurrent: false,
  daysOfWeek: [],
  groups: [],
  guests: [],
  participants: [],
  startRecur: '',
  endRecur: '',
  participateUserEvent: false,
  eventType: Object.keys(EVENTS_COLOR)[0],
};

export const useErrors = (state) => {
  const { title, startDate, endDate, startTime, endTime } = state;
  const [errors, setErrors] = useObjectState({});

  useEffect(() => {
    setErrors({ title: null, endTime: null, startTime: null, endDate: null, startDate: null });
    if (!title) setErrors({ title: i18n.__('pages.AddEvent.needTitle') });

    if (moment(`${startDate} ${startTime}`).isSameOrAfter(`${endDate} ${endTime}`)) {
      setErrors({
        endDate: i18n.__('pages.AddEvent.endMustBeAfterBegin'),
        endTime: i18n.__('pages.AddEvent.endMustBeAfterBegin'),
      });
    }
    if (moment(`${startDate} ${startTime}`).isBefore()) {
      setErrors({
        startDate: i18n.__('pages.AddEvent.startMustBeAfterNow'),
        startTime: i18n.__('pages.AddEvent.startMustBeAfterNow'),
      });
    }
  }, [title, endTime, startTime, endDate, startDate]);

  return errors;
};

export const descriptionWithLinks = (description) => {
  const arrayDescription = description ? description.split(' ') : [];
  // eslint-disable-next-line max-len
  const regex = new RegExp(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/,
  );
  const html = [];
  arrayDescription.forEach((line) => {
    if (line.match(regex)) {
      html.push(
        <a href={line} key={line} target="_blank" rel="noreferrer">
          {`${line} `}
        </a>,
      );
    } else {
      html.push(`${line} `);
    }
  });
  return html;
};
