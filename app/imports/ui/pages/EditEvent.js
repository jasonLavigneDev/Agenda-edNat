import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';

import { editEvent, deleteEvent } from '../../api/events/methods';
import { useObjectState } from '../../api/utils/hooks';
import Groups from '../../api/groups/groups';

import ModalWrapper from '../components/system/ModalWrapper';
import ROUTES from '../layouts/routes';
import { useErrors, initialState } from '../components/events/utils';
import InformationsForm from '../components/events/InformationsForm';
import ParticipantsSelector from '../components/events/ParticipantsSelector';
import GroupsSelector from '../components/events/GroupsSelector';
import Spinner from '../components/system/Spinner';
import { useAppContext } from '../contexts/context';

const useStyles = makeStyles((theme) => ({
  redButton: {
    marginRight: 15,
    backgroundColor: theme.palette.error.main,
    color: theme.palette.tertiary.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const EditEvent = ({ history, match: { params } }) => {
  const goHome = () => history.push(ROUTES.HOME);
  const classes = useStyles();
  const [state, setState] = useObjectState(initialState);
  const [{ user, userId }] = useAppContext();
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
    setLoading(true);
    Meteor.call('events.get', { _id: params._id }, (e, event = {}) => {
      setLoading(false);
      setState({
        ...event,
        startDate: moment(event.start).format('YYYY-MM-DD'),
        endDate: event.allDay
          ? moment(event.end).subtract(1, 'days').format('YYYY-MM-DD')
          : moment(event.end).format('YYYY-MM-DD'),
        startRecur: moment(event.startRecur).format('YYYY-MM-DD'),
        endRecur: moment(event.endRecur).format('YYYY-MM-DD'),
        startTime: moment(event.start).format('HH:mm'),
        endTime: event.allDay ? '23:59' : moment(event.end).format('HH:mm'),
        participateUserEvent: event.participants.some((participant) => participant._id === userId),
      });
    });
  }, []);

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

  const editEventCall = () => {
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
              participant._id === organizerId && organizerGroup !== ''
                ? { ...participant, groupId: organizerGroup }
                : participant,
            ),
            ...users.map((u) => ({
              email: u.emails[0].address,
              _id: u._id,
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
        endTime,
        startRecur: rest.recurrent ? rest.startRecur : null,
        endRecur: rest.recurrent ? rest.endRecur : null,
        daysOfWeek: rest.recurrent ? daysOfWeek : null,
        start: state.allDay ? moment.utc(`${startDate} 00:00`).format() : moment(`${startDate} ${startTime}`).format(),
        end: state.allDay
          ? moment.utc(`${endDate} 00:00`).add(1, 'days').format()
          : moment(`${endDate} ${endTime}`).format(),
      };
      editEvent.call({ data }, (error) => {
        setLoading(false);
        if (error) {
          msg.error(error.reason || error.message);
        } else {
          msg.success(i18n.__('pages.EditEvent.eventCreated'));
          history.push('/');
        }
      });
    } catch (error) {
      msg.error(error.reason || error.message);
      setLoading(false);
    }
  };

  const deleteEventCall = () => {
    try {
      setLoading(true);
      deleteEvent.call({ eventId: params._id }, (error) => {
        setLoading(false);
        if (error) {
          msg.error(error.reason);
        } else {
          msg.success(i18n.__('pages.EditEvent.eventDeleted'));
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
      title={i18n.__('pages.EditEvent.title')}
      onClose={goHome}
      loading={loading}
      buttons={[
        {
          text: i18n.__('pages.EditEvent.delete'),
          onClick: deleteEventCall,
          props: { className: classes.redButton },
          key: 'first',
        },
        {
          text: i18n.__('pages.EditEvent.closeButton'),
          onClick: goHome,
          props: { color: 'default' },
          key: 'second',
        },
        {
          text: i18n.__('pages.EditEvent.validateButton'),
          onClick: editEventCall,
          props: { color: 'primary', disabled: !isValid },
          key: 'third',
        },
      ]}
    >
      {loading ? (
        <Spinner inside />
      ) : (
        <>
          <InformationsForm errors={errors} stateHook={[state, setState]} />
          <GroupsSelector errors={errors} stateHook={[state, setState]} />
          <ParticipantsSelector stateHook={[state, setState]} handleCheckBoxUser={handleCheckBoxUser} />
        </>
      )}
    </ModalWrapper>
  );
};

export default EditEvent;

EditEvent.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
