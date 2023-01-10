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
import { useAppContext } from '../contexts/context';
import ParticipantsSelector from '../components/events/ParticipantsSelector';
import GroupsSelector from '../components/events/GroupsSelector';
import Calendar from '../components/system/Calendar/Calendar';

const AddEvent = ({ history }) => {
  const goHome = () => history.push(ROUTES.HOME);
  const [{ user, userId }] = useAppContext();
  if (user === undefined) return null;

  const { date, start, end } = useQuery();
  const { groupId } = useQuery();
  const [state, setState] = useObjectState(initialState);
  const errors = useErrors(state);
  const [isValid, setValidity] = useState(false);
  const [loading, setLoading] = useState(false);

  moment.suppressDeprecationWarnings = true;

  console.log('errors', errors);

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
      participateUserEvent: true,
    });
  }, [date, start, end]);

  useEffect(() => {
    const organizerId = userId;
    if (
      state.participateUserEvent === true &&
      !state.participants.some((participant) => participant._id === organizerId)
    ) {
      setState({
        participants: [...state.participants, ...[{ _id: organizerId, email: user.emails[0].address, status: 2 }]],
      });
    } else if (
      state.participateUserEvent === false &&
      state.participants.some((participant) => participant._id === organizerId)
    ) {
      setState({
        participants: state.participants.filter((participant) => participant._id !== organizerId),
      });
    }
  }, [state.participateUserEvent]);

  // if user is not in participants and participateUserEvent is false : add him to the list
  const handleCheckBoxUser = () => {
    setState({
      participateUserEvent: !state.participateUserEvent,
    });
  };

  const createEventCall = () => {
    try {
      setLoading(true);

      const organizerId = userId;
      const { groups, participants, endDate, startDate, endTime, startTime, daysOfWeek, ...rest } = state;
      let allParticipants = [...participants];
      let organizerGroup = '';
      if (groups.length) {
        groups.forEach(({ _id }) => {
          const { admins, animators, members } = Groups.findOne({ _id });
          const groupUsers = [...admins, ...animators, ...members];
          if (organizerGroup === '' && groupUsers.includes(organizerId)) {
            organizerGroup = _id;
          }
          // add users from group that are not already in participants (excluding event organizer)
          const users = Meteor.users
            .find({
              _id: {
                $nin: [...allParticipants.map((p) => p._id), organizerId],
                $in: [...admins, ...animators, ...members],
              },
            })
            .fetch();
          allParticipants = [
            ...allParticipants.map((participant) =>
              participant._id === userId && organizerGroup !== ''
                ? { ...participant, groupId: organizerGroup }
                : participant,
            ),
            ...users.map((participant) => ({
              email: participant.emails[0].address,
              _id: participant._id,
              groupId: _id,
            })),
          ];
        });
      }
      const data = {
        ...rest,
        groups,
        // make sure that event organizer is a validated participant if present
        participants: allParticipants.map((p) => (p._id === organizerId ? { ...p, status: 2 } : p)),
        startTime,
        startRecur: rest.recurrent ? rest.startRecur : null,
        endRecur: rest.recurrent ? rest.endRecur : null,
        daysOfWeek: rest.recurrent ? daysOfWeek : null,
        endTime,
        start: state.allDay ? moment.utc(`${startDate} 00:00`).format() : moment(`${startDate} ${startTime}`).format(),
        end: state.allDay
          ? moment.utc(`${endDate} 00:00`).add(1, 'days').format()
          : moment(`${endDate} ${endTime}`).format(),
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
    <>
      <Calendar />
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
        <GroupsSelector errors={errors} stateHook={[state, setState]} groupId={groupId} />
        <ParticipantsSelector stateHook={[state, setState]} handleCheckBoxUser={handleCheckBoxUser} />
      </ModalWrapper>
    </>
  );
};

export default AddEvent;

AddEvent.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
