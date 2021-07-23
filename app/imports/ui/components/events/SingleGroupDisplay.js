import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import DeleteButton from '@material-ui/icons/CloseRounded';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';
import RemoveIcon from '@material-ui/icons/CloseOutlined';
import Groups from '../../../api/groups/groups';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: 5,
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
  delete: {
    marginRight: 10,
  },
  header: {
    display: 'flex',
    alignItem: 'center',
  },
  results: {
    flexWrap: 'wrap',
  },
}));

const SingleGroupDisplay = ({ group, handleDelete, view, event }) => {
  const classes = useStyles();

  const users = useTracker(() => {
    const { admins = [], animators = [], members = [] } = Groups.findOne({ _id: group._id }) || {};
    return Meteor.users
      .find({ _id: { $in: [...admins, ...animators, ...members], $ne: view ? null : Meteor.userId() } })
      .fetch();
  });

  return (
    <Accordion>
      <AccordionSummary className={classes.header} square="true" expandIcon={<ExpandMoreIcon />}>
        {handleDelete && (
          <IconButton
            size="small"
            onClick={() => handleDelete(group._id)}
            color="primary"
            aria-label="remove group"
            component="span"
            className={classes.delete}
          >
            <DeleteButton />
          </IconButton>
        )}
        <Typography>{group.name}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.results}>
        {users.map(({ emails = [], avatar, _id }) => {
          const status = () => {
            if (event.participants) {
              const thisUser = event.participants.find((p) => p._id === _id);
              return thisUser.status;
            }
            return 1;
          };
          const displayStatus = view && event.participants && status() !== 1;
          return (
            <Chip
              key={emails[0].address}
              avatar={<Avatar alt={emails[0].address} src={avatar} />}
              label={emails[0].address}
              className={`${classes.chip} ${
                displayStatus ? (status() === 0 ? classes.errorChip : classes.successChip) : ''
              }`}
              color={displayStatus ? 'primary' : 'default'}
              onDelete={displayStatus ? () => null : null}
              deleteIcon={displayStatus ? status() === 0 ? <RemoveIcon /> : <DoneIcon /> : null}
            />
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};

export default SingleGroupDisplay;

SingleGroupDisplay.propTypes = {
  group: PropTypes.objectOf(PropTypes.any).isRequired,
  handleDelete: PropTypes.func,
  view: PropTypes.bool,
  event: PropTypes.objectOf(PropTypes.any).isRequired,
};

SingleGroupDisplay.defaultProps = {
  handleDelete: null,
  view: false,
};
