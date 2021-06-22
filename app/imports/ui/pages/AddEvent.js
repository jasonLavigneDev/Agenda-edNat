import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import moment from 'moment';

import Groups from '../../api/groups/groups';
import { createEvent } from '../../api/events/methods';
import { useObjectState, useQuery } from '../../api/utils/hooks';

import ModalWrapper from '../components/system/ModalWrapper';
import ROUTES from '../layouts/routes';
import { useErrors, initialState } from '../components/events/utils';
import InformationsForm from '../components/events/InformationsForm';
import ParticipantsSelector from '../components/events/ParticipantsSelector';
import GroupsSelector from '../components/events/GroupsSelector';

const AddEvent = ({ history }) => {
  const goHome = () => history.push(ROUTES.HOME);
  const { date, start, end } = useQuery();
  const [state, setState] = useObjectState(initialState);
  const errors = useErrors(state);
  const [isValid, setValidity] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      Object.values(errors).reduce((a, c) => (c !== null ? 1 : a), 0) === 0 &&
      state.title &&
      state.startDate &&
      ((state.startTime && state.endTime) || state.allDay)
    ) {
      setValidity(true);
    } else {
      setValidity(false);
    }
  }, [errors, state]);

  useEffect(() => {
    setState({
      startDate: start ? moment(start).format('YYYY-MM-DD') : moment(date).format('YYYY-MM-DD'),
      endDate: end ? moment(end).format('YYYY-MM-DD') : moment(date).format('YYYY-MM-DD'),
      startTime: start ? moment(start).format('HH:mm') : date ? moment(date).format('HH:mm') : moment().format('HH:mm'),
      endTime: end
        ? moment(end).format('HH:mm')
        : date
        ? moment(date).add(1, 'hour').format('HH:mm')
        : moment().add(1, 'hour').format('HH:mm'),
    });
  }, [date, start, end]);

  const createEventCall = () => {
    try {
      setLoading(true);

      const { groups, participants, endDate, startDate, endTime, startTime, daysOfWeek, ...rest } = state;
      let allParticipants = [...participants];
      if (groups.length) {
        groups.forEach(({ _id }) => {
          const { admins, animators, members } = Groups.findOne({ _id });
          const users = Meteor.users
            .find({ _id: { $nin: allParticipants.map((p) => p._id), $in: [...admins, ...animators, ...members] } })
            .fetch();
          allParticipants = [
            ...allParticipants,
            ...users.map((user) => ({
              email: user.emails[0].address,
              _id: user._id,
              groupId: _id,
            })),
          ];
        });
      }

      const data = {
        ...rest,
        groups,
        participants: allParticipants,
        startTime,
        startRecur: rest.recurrent ? rest.startRecur : null,
        endRecur: rest.recurrent ? rest.endRecur : null,
        daysOfWeek: rest.recurrent ? daysOfWeek : null,
        endTime,
        start: moment(`${startDate} ${!state.allDay ? startTime : '00:00'}`).format(),
        end: moment(`${endDate} ${!state.allDay ? endTime : '23:59'}`).format(),
      };
      createEvent.call({ data }, (error) => {
        setLoading(false);
        if (error) {
          msg.error(error.reason);
        } else {
          msg.success(i18n.__('pages.AddEvent.eventCreated'));
          history.push('/');
        }
      });
    } catch (error) {
      msg.error(error.reason);
      setLoading(false);
    }
  };

  return (
    <ModalWrapper
      open
      title={i18n.__('pages.AddEvent.title')}
      onClose={goHome}
      loading={loading}
      buttons={[
        {
          text: i18n.__('pages.AddEvent.closeButton'),
          onClick: goHome,
          props: { color: 'default' },
          key: 'first',
        },
        {
          text: i18n.__('pages.AddEvent.validateButton'),
          onClick: createEventCall,
          props: { color: 'primary', disabled: !isValid },
          key: 'second',
        },
      ]}
    >
      <InformationsForm errors={errors} stateHook={[state, setState]} />
      <GroupsSelector errors={errors} stateHook={[state, setState]} />
      <ParticipantsSelector stateHook={[state, setState]} />
    </ModalWrapper>
  );
};

export default AddEvent;

AddEvent.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
