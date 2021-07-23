import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { validateEmail } from '../../../api/utils/functions';

const useStyles = makeStyles(() => ({
  chip: {
    margin: 5,
  },
  field: {
    width: '100%',
  },
  resultWrapper: {
    marginBottom: 50,
  },
}));

const ParticipantsSelector = ({ stateHook: [state, setState] }) => {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const searchResults = useTracker(() => {
    const regex = new RegExp(search, 'i');
    const exclude = state.participants.map(({ _id }) => _id);
    Meteor.subscribe('users.search', { search, exclude });

    return Meteor.users
      .find({ _id: { $ne: Meteor.userId(), $nin: exclude }, 'emails.address': { $regex: regex } })
      .fetch();
  });

  const resetSearch = () => setSearch('');

  const handleSelect = (participant) => {
    setState({
      participants: [
        ...state.participants,
        {
          _id: participant._id,
          email: participant.emails[0].address,
        },
      ],
    });
    resetSearch();
  };

  const handleSelectGuest = () => {
    setState({ guests: [...state.guests, search] });
    resetSearch();
  };

  const handleDelete = (itemEmail, key) => {
    setState({
      [key]: [
        ...state[key].filter((item) => (typeof item === 'object' ? item.email !== itemEmail : item !== itemEmail)),
      ],
    });
  };

  return (
    <Grid container spacing={2} className={classes.resultWrapper}>
      <Grid item md={12} xs={12}>
        <Divider />
        <h2>{i18n.__('pages.FormEvent.participants')}</h2>
      </Grid>
      <Grid item md={12} xs={12}>
        <TextField
          variant="outlined"
          label={i18n.__('pages.FormEvent.searchUsers')}
          className={classes.field}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Grid>
      <Grid item md={12} xs={12}>
        {search && (
          <List dense>
            {searchResults.map((result) => (
              <ListItem key={result._id} button onClick={() => handleSelect(result)}>
                <ListItemAvatar>
                  <Avatar src={result.avatar} />
                </ListItemAvatar>
                <ListItemText primary={`${result.firstName} ${result.lastName}`} secondary={result.emails[0].address} />
              </ListItem>
            ))}
            {!Meteor.users.findOne({ 'emails.address': search }) && validateEmail(search) && (
              <ListItem button onClick={handleSelectGuest}>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText primary={search} secondary={i18n.__('pages.FormEvent.addAsAGuest')} />
              </ListItem>
            )}
          </List>
        )}
      </Grid>
      <Grid item md={12} xs={12}>
        {state.participants
          .filter(({ groupId }) => !groupId)
          .map((part) => (
            <Chip
              key={part._id}
              className={classes.chip}
              color="primary"
              label={part.email}
              onDelete={() => handleDelete(part.email, 'participants')}
            />
          ))}
        {state.guests.map((guest) => (
          <Chip
            key={guest}
            className={classes.chip}
            color="secondary"
            label={guest}
            onDelete={() => handleDelete(guest, 'guests')}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default ParticipantsSelector;

ParticipantsSelector.propTypes = {
  stateHook: PropTypes.arrayOf(PropTypes.any).isRequired,
};
