import React from 'react';
import i18n from 'meteor/universe:i18n';
import PropTypes from 'prop-types';
import { useTracker } from 'meteor/react-meteor-data';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import SingleGroupDisplay from './SingleGroupDisplay';
import Groups from '../../../api/groups/groups';
import { getGroupName } from '../../../api/utils/functions';

const useStyles = makeStyles(() => ({
  field: {
    width: '100%',
  },
  chip: {
    margin: 5,
  },
}));

const GroupsSelector = ({ stateHook: [state, setState], errors, groupId }) => {
  const classes = useStyles();

  if (groupId !== undefined) {
    const selectedIds = state.groups.map(({ _id }) => _id);
    if (!selectedIds.includes(groupId)) {
      const group = Groups.findOne({ _id: groupId });
      if (group !== undefined) {
        setState({
          groups: [...state.groups, { _id: groupId, name: group.name, type: group.type }],
        });
      }
    }
  }

  const handleSelect = (e) => {
    const group = Groups.findOne(e.target.value);
    setState({
      groups: [...state.groups, { _id: e.target.value, name: group.name, type: group.type }],
    });
  };

  const handleDelete = (idGroup) => {
    setState({
      groups: [...state.groups.filter((g) => g._id !== idGroup)],
    });
  };

  const groups = useTracker(() => {
    const handler = Meteor.subscribe('groups.member');
    const selectedIds = state.groups.map(({ _id }) => _id);
    const list = Groups.find({ _id: { $nin: selectedIds } }, { limit: 100, sort: { name: -1 } }).fetch();
    return {
      ready: handler.ready(),
      list,
    };
  });

  useTracker(() => {
    Meteor.subscribe('users.groups', { groupsIds: state.groups.map(({ _id }) => _id) });
  });

  return (
    <Grid container spacing={2}>
      <Grid item md={12} xs={12}>
        <Divider />
        <h2>{i18n.__('pages.FormEvent.groups')}</h2>
      </Grid>
      <Grid item md={12} xs={12}>
        <FormControl className={classes.field} error={!!errors.groups} variant="outlined">
          <Select value={i18n.__('pages.FormEvent.selectAGroup')} onChange={handleSelect}>
            <MenuItem value={i18n.__('pages.FormEvent.selectAGroup')}>
              {i18n.__('pages.FormEvent.selectAGroup')}
            </MenuItem>
            {groups.list.map((group) => (
              <MenuItem key={group._id} value={group._id}>
                {getGroupName(group)}
              </MenuItem>
            ))}
          </Select>
          {!!errors.groups && <FormHelperText>{errors.groups}</FormHelperText>}
        </FormControl>
      </Grid>
      <Grid item md={12} xs={12}>
        {state.groups.map((group) => (
          <SingleGroupDisplay key={group._id} group={group} handleDelete={handleDelete} event={state} />
        ))}
      </Grid>
    </Grid>
  );
};

export default GroupsSelector;

GroupsSelector.propTypes = {
  stateHook: PropTypes.arrayOf(PropTypes.any).isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
  groupId: PropTypes.string.isRequired,
};
