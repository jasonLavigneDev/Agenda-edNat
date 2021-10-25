import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import i18n from 'meteor/universe:i18n';
import { useTracker } from 'meteor/react-meteor-data';
import moment from 'moment';

import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import RemoveIcon from '@material-ui/icons/CloseOutlined';

import { useObjectState } from '../../api/utils/hooks';
import { changeUserStatus } from '../../api/events/methods';
import { useAppContext } from '../contexts/context';

import ModalWrapper from '../components/system/ModalWrapper';
import Spinner from '../components/system/Spinner';
import ROUTES from '../layouts/routes';
import { descriptionWithLinks } from '../components/events/utils';
import SingleGroupDisplay from '../components/events/SingleGroupDisplay';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: 5,
  },
  value: {
    whiteSpace: 'pre-wrap',
    '& > a': {
      color: theme.palette.primary.main,
    },
  },
  redButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.tertiary.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  successChip: {
    backgroundColor: theme.palette.success.main,
    '&:focus': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  errorChip: {
    backgroundColor: theme.palette.error.main,
    '&:focus': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const ReadEvent = ({ history, match: { params } }) => {
  const classes = useStyles();
  const [{ userId }] = useAppContext();
  const goHome = () => history.push(ROUTES.HOME);
  const goEdit = () => history.push(ROUTES.EVENT_EDIT_MAKE(params._id));
  const [state, setState] = useObjectState({});
  const [loading, setLoading] = useState(false);

  const setEventIntoState = (event) => {
    setState({
      ...event,
      startDate: moment(event.start).format('YYYY-MM-DD'),
      endDate: event.allDay
        ? moment(event.end).subtract(1, 'days').format('YYYY-MM-DD')
        : moment(event.end).format('YYYY-MM-DD'),
      startTime: moment(event.start).format('HH:mm'),
      endTime: event.allDay ? '23:59' : moment(event.end).format('HH:mm'),
    });
  };

  useEffect(() => {
    setLoading(true);
    Meteor.call('events.get', { _id: params._id }, (e, event = {}) => {
      setEventIntoState(event);
      setLoading(false);
    });
  }, []);

  const informations = [
    { label: i18n.__('pages.FormEvent.eventTitle'), value: state.title },
    {
      label: i18n.__('pages.FormEvent.eventPlace'),
      value: state.location || i18n.__('pages.ReadEvent.eventPlaceNotDefined'),
    },
    { label: i18n.__('pages.FormEvent.startDate'), value: !state.recurrent ? state.startDate : null },
    { label: i18n.__('pages.FormEvent.endDate'), value: !state.recurrent ? state.endDate : null },
    {
      label: i18n.__('pages.FormEvent.from'),
      value: state.recurrent ? moment(state.startRecur).format('DD-MM-YYYY') : null,
    },
    {
      label: i18n.__('pages.FormEvent.to'),
      value: state.recurrent ? moment(state.endRecur).format('DD-MM-YYYY') : null,
    },
    { label: i18n.__('pages.FormEvent.allDay'), value: state.allDay ? i18n.__('pages.ReadEvent.yes') : null },
    { label: i18n.__('pages.FormEvent.startTime'), value: state.allDay ? null : state.startTime },
    { label: i18n.__('pages.FormEvent.endTime'), value: state.allDay ? null : state.endTime },

    { label: i18n.__('pages.FormEvent.recurrent'), value: state.recurrent ? i18n.__('pages.ReadEvent.yes') : null },
    {
      label: i18n.__('pages.FormEvent.daysOfWeek'),
      value: state.daysOfWeek ? state.daysOfWeek.map((d) => i18n.__(`pages.FormEvent.day_${d}`)).join(', ') : null,
    },
    { label: i18n.__('pages.FormEvent.description'), value: descriptionWithLinks(state.description), width: 12 },
  ];

  useTracker(() => {
    const { groups = [] } = state;
    const groupsIds = groups.map(({ _id }) => _id);

    Meteor.subscribe('users.groups', { groupsIds });
    Meteor.subscribe('groups.list', { groupsIds });
  });

  const acceptEvent = () => {
    setLoading(true);
    changeUserStatus.call({ eventId: params._id, status: 2 }, (e, event) => {
      setLoading(false);
      if (e) {
        msg.error(e.reason);
      } else {
        setEventIntoState(event);
        msg.success(i18n.__('pages.ReadEvent.accepted'));
      }
    });
  };
  const refuseEvent = () => {
    setLoading(true);
    changeUserStatus.call({ eventId: params._id, status: 0 }, (e, event) => {
      setLoading(false);
      if (e) {
        msg.error(e.reason);
      } else {
        setEventIntoState(event);
        msg.success(i18n.__('pages.ReadEvent.refused'));
      }
    });
  };

  return (
    <ModalWrapper
      open
      title={i18n.__('pages.ReadEvent.title')}
      loading={loading}
      onClose={goHome}
      buttons={[
        {
          text: state.userId !== userId ? i18n.__('pages.ReadEvent.closeButton') : null,
          onClick: state.userId !== userId ? goHome : null,
          props: { color: 'default' },
          key: 'first',
        },
        {
          text: state.userId !== userId ? i18n.__('pages.ReadEvent.refuse') : i18n.__('pages.ReadEvent.cancelButton'),
          onClick: state.userId !== userId ? refuseEvent : goHome,
          props: state.userId !== userId ? { className: classes.redButton } : {},
          key: 'second',
        },
        {
          text: state.userId !== userId ? i18n.__('pages.ReadEvent.accept') : i18n.__('pages.ReadEvent.editButton'),
          onClick: state.userId !== userId ? acceptEvent : goEdit,
          props: { color: 'primary' },
          key: 'third',
        },
      ]}
    >
      {loading ? (
        <Spinner inside />
      ) : (
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
            <Divider />
            <h2>{i18n.__('pages.ReadEvent.informations')}</h2>
          </Grid>
          {informations.map((item) =>
            item.value ? (
              <Grid item md={item.width || 6} xs={12} key={item.label}>
                <Typography>
                  <b>{item.label}:</b> <span className={classes.value}>{item.value}</span>
                </Typography>
              </Grid>
            ) : null,
          )}

          {!!state.groups && !!state.groups.length && (
            <>
              <Grid item md={12} xs={12}>
                <Divider />
                <h2>{i18n.__('pages.ReadEvent.groups')}</h2>
              </Grid>
              <Grid item md={12} xs={12}>
                {state.groups.map((group) => (
                  <SingleGroupDisplay key={group._id} group={group} view event={state} />
                ))}
              </Grid>
            </>
          )}
          {((!!state.participants && !!state.participants.filter(({ groupId }) => !groupId).length) ||
            (!!state.guests && !!state.guests.length)) && (
            <Grid item md={12} xs={12}>
              <Divider />
              <h2>{i18n.__('pages.ReadEvent.participants')}</h2>
              {state.participants
                .filter(({ groupId }) => !groupId)
                .map((part) => {
                  const displayStatus = part.status !== 1;
                  return (
                    <Chip
                      key={part._id}
                      className={`${classes.chip} ${
                        displayStatus ? (part.status === 0 ? classes.errorChip : classes.successChip) : ''
                      }`}
                      color={displayStatus ? 'primary' : 'default'}
                      onDelete={displayStatus ? () => null : null}
                      deleteIcon={displayStatus ? part.status === 0 ? <RemoveIcon /> : <DoneIcon /> : null}
                      label={part.email}
                    />
                  );
                })}
              {state.guests.map((guest) => (
                <Chip key={guest} color="secondary" label={guest} className={classes.chip} />
              ))}
            </Grid>
          )}
        </Grid>
      )}
    </ModalWrapper>
  );
};

export default ReadEvent;

ReadEvent.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
