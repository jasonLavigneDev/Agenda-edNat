import React from 'react';
import i18n from 'meteor/universe:i18n';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import AppSettings from '../../../api/appsettings/appsettings';

const useStyle = makeStyles(() => ({
  divContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
    marginTop: '10vh',
    border: 'rgba(255, 0, 0, 0.7) solid 5px',
    borderRadius: '15px',
    margin: 'auto',
    padding: 30,
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
  },
  paragraph: {
    textAlign: 'center',
  },
}));

const SiteInMaintenance = ({ appsettings, ready }) => {
  const classes = useStyle();
  return (
    <>
      {ready ? (
        <div className={classes.divContainer}>
          <Typography className={classes.title} variant="h5" color="inherit">
            {i18n.__('components.SiteInMaintenance.maintenanceInProgress')}
          </Typography>

          <Typography className={classes.paragraph} color="inherit">
            {i18n.__(appsettings.textMaintenance)}
          </Typography>
        </div>
      ) : null}
    </>
  );
};

export default withTracker(() => {
  const subSettings = Meteor.subscribe('appsettings.all');
  const appsettings = AppSettings.findOne();
  const ready = subSettings.ready();
  return {
    appsettings,
    ready,
  };
})(SiteInMaintenance);

SiteInMaintenance.defaultProps = {
  appsettings: {},
};

SiteInMaintenance.propTypes = {
  appsettings: PropTypes.objectOf(PropTypes.any),
  ready: PropTypes.bool.isRequired,
};
