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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { validateEmail } from '../../../api/utils/functions';
import { useAppContext } from '../../contexts/context';
// import Groups from '../../../api/groups/groups';

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

const ParticipantsSelector = ({ stateHook: [state, setState], handleCheckBoxUser }) => {
  const classes = useStyles();

  const [search, setSearch] = useState('');
  const [{ user, userId }] = useAppContext();

  const searchResults = useTracker(() => {
    const regex = new RegExp(search, 'i');
    const exclude = state.participants.map(({ _id }) => _id);
    Meteor.subscribe('users.search', { search, exclude });

    return Meteor.users.find({ _id: { $ne: userId, $nin: exclude }, 'emails.address': { $regex: regex } }).fetch();
  });
  // const searchAll = useTracker(() => {
  //   // Meteor.subscribe('users.searchAll');
  //   return Meteor.users.find({}).fetch();
  // });
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

  // if checkBoxUser is on, we add the current user in participants array

  // const handleCheckBoxGroupAdmin = () => {
  //   setState({
  //     ParticipateAdmin: !state.ParticipateAdmin,
  //   });
  //   console.log(`state.groups`, state.groups.length);
  //   if (state.groups.length > 0) {
  //     const adminGrp = Groups.find({ _id: { $in: state.groups.map((grp) => grp._id) } }).map((grp) => grp.admins);
  //     const arrayAdmins = [];

  //     adminGrp.map((admin) => arrayAdmins.push(admin[0]));
  //     console.log(`arrayAdmins`, arrayAdmins);
  //     console.log(`all admin groups`, adminGrp);
  //     //const grpIds = state.groups.map((grp) => grp._id);

  //     console.log(
  //       ` group user`,
  //       state.groups.map((grp) => grp._id),
  //     );

  //     console.log(` admin grp`, adminGrp[1]);

  //     Meteor.call('events.allUsers', { arrayAdmins }, (error, result) => {
  //       if (error) {
  //         console.log(error);
  //       } else {
  //         console.log('arrayAdmins', result);
  //         result.map((admin) => console.log(`admin`, admin._id, admin.emails[0].address));

  //         setState({
  //           participants: [...state.participants, ...[{ _id: result[0]._id, email: result[0].emails[0].address }]],
  //         });
  //         // console.log(`state.participants dans handleAdmin`, state.participants);
  //         // setState({
  //         //   participants: [...state.participants, ...[{ _id: result[0]._id, email: result[1].emails[0].address }]],
  //         // });

  //         // for (let i = 0; i < result.length; i += 1) {
  //         //   setState({
  //         //     participants: [...state.participants, ...[{ _id: result[i]._id, email: result[i].emails[0].address }]],
  //         //   });
  //         // }

  //         console.log(' participants handleGrp: ', state.participants);
  //       }
  //     });
  //   }
  // };

  const handleDelete = (itemEmail, key) => {
    setState({
      [key]: [
        ...state[key].filter((item) => (typeof item === 'object' ? item.email !== itemEmail : item !== itemEmail)),
      ],
    });
    if (user.emails[0].address === itemEmail) {
      setState({
        participateUserEvent: !state.participateUserEvent,
      });
    }
  };

  return (
    <Grid container spacing={2} className={classes.resultWrapper}>
      <Grid item md={12} xs={12}>
        <Divider />
        <Grid item md={12} xs={12}>
          <FormControlLabel
            control={
              <Checkbox id="chk" onChange={handleCheckBoxUser} checked={state.participateUserEvent} color="primary" />
            }
            label={i18n.__('pages.FormEvent.participateUserEvent')}
          />
        </Grid>
        <Divider />
        <h2>{i18n.__('pages.FormEvent.participants')}</h2>
        {/* <Grid item md={12} xs={12}>
          <FormControlLabel
            control={<Checkbox checked={state.ParticipateAdmin} onChange={handleCheckBoxGroupAdmin} color="primary" />}
            label={i18n.__('pages.FormEvent.ParticipateAdmin')}
          />
          </Grid> */}
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
          .filter(({ _id, groupId }) => !groupId && _id !== userId)
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
  handleCheckBoxUser: PropTypes.func.isRequired,
};
