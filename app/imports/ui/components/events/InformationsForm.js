import React from 'react';
import i18n from 'meteor/universe:i18n';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  field: {
    width: '100%',
  },
}));

const InformationsForm = ({ stateHook: [state, setState], errors }) => {
  const classes = useStyles();

  const handleToggleRecurrence = (e) => {
    setState({
      recurrent: e.target.checked,
      daysOfWeek: !e.target.checked ? null : [moment(state.startDate).day()],
      startRecur: !e.target.checked ? null : state.startDate,
      endRecur: !e.target.checked ? null : moment(state.startDate).add(1, 'months').format('YYYY-MM-DD'),
    });
  };

  const handleToggledaysOfWeek = (e) => {
    const day = Number(e.target.value);
    const { daysOfWeek = [] } = state;
    if (day !== moment(state.startDate).day()) {
      if (daysOfWeek.indexOf(day) > -1) {
        setState({ daysOfWeek: daysOfWeek.filter((d) => d !== day) });
      } else {
        setState({ daysOfWeek: [...daysOfWeek, day] });
      }
    } else {
      msg.error(i18n.__('pages.FormEvent.youCantRemoveToday'));
    }
  };

  return (
    <form noValidate>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <Divider />
          <h2>{i18n.__('pages.FormEvent.informations')}</h2>
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            variant="outlined"
            label={i18n.__('pages.FormEvent.eventTitle')}
            className={classes.field}
            value={state.title}
            onChange={(e) => setState({ title: e.target.value })}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            variant="outlined"
            label={i18n.__('pages.FormEvent.eventPlace')}
            className={classes.field}
            value={state.location}
            onChange={(e) => setState({ location: e.target.value })}
          />
        </Grid>
        {/* {moment(state.startDate).isSame(state.endDate) && (
          <>
            <Grid item md={12} xs={12}>
              <FormControlLabel
                control={<Checkbox checked={state.recurrent} onChange={handleToggleRecurrence} color="primary" />}
                label={i18n.__('pages.FormEvent.recurrent')}
              />
            </Grid>
            {state.recurrent && (
              <>
                <Grid item md={12} xs={12}>
                  {[1, 2, 3, 4, 5, 6, 0].map((day) => (
                    <FormControlLabel
                      key={day}
                      control={
                        <Checkbox
                          checked={state.daysOfWeek.indexOf(day) > -1}
                          onChange={handleToggledaysOfWeek}
                          value={day}
                          color="primary"
                        />
                      }
                      label={i18n.__(`pages.FormEvent.day_${day}`)}
                    />
                  ))}
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    variant="outlined"
                    label={i18n.__('pages.FormEvent.from')}
                    type="date"
                    className={classes.field}
                    value={state.startRecur}
                    error={!!errors.startRecur}
                    helperText={errors.startRecur}
                    onChange={(e) => setState({ startRecur: e.target.value || state.startDate })}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    variant="outlined"
                    label={i18n.__('pages.FormEvent.to')}
                    type="date"
                    className={classes.field}
                    value={state.endRecur}
                    error={!!errors.endRecur}
                    helperText={errors.endRecur}
                    onChange={(e) => setState({ endRecur: e.target.value })}
                  />
                </Grid>
              </>
            )}
          </>
        )} */}
        {!state.recurrent && (
          <>
            <Grid item md={6} xs={12}>
              <TextField
                variant="outlined"
                label={i18n.__('pages.FormEvent.startDate')}
                type="date"
                className={classes.field}
                value={state.startDate}
                error={!!errors.startDate}
                helperText={errors.startDate}
                onChange={(e) => setState({ startDate: e.target.value || state.startDate })}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                variant="outlined"
                label={i18n.__('pages.FormEvent.endDate')}
                type="date"
                className={classes.field}
                value={state.endDate || state.startDate}
                error={!!errors.endDate}
                helperText={errors.endDate}
                onChange={(e) => setState({ endDate: e.target.value || state.endDate || state.startDate })}
              />
            </Grid>
          </>
        )}

        <Grid item md={12} xs={12}>
          <FormControlLabel
            control={
              <Checkbox checked={state.allDay} onChange={() => setState({ allDay: !state.allDay })} color="primary" />
            }
            label={i18n.__('pages.FormEvent.allDay')}
          />
        </Grid>
        {!state.allDay && (
          <>
            <Grid item md={6} xs={12}>
              <TextField
                variant="outlined"
                label={i18n.__('pages.FormEvent.startTime')}
                inputProps={{
                  step: 300, // 5 min
                }}
                type="time"
                className={classes.field}
                value={state.startTime}
                error={!!errors.startTime}
                helperText={errors.startTime}
                onChange={(e) => setState({ startTime: e.target.value || state.startTime })}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                variant="outlined"
                label={i18n.__('pages.FormEvent.endTime')}
                inputProps={{
                  step: 300, // 5 min
                }}
                type="time"
                className={classes.field}
                value={state.endTime}
                error={!!errors.endTime}
                helperText={errors.endTime}
                onChange={(e) => setState({ endTime: e.target.value || state.endTime })}
              />
            </Grid>
          </>
        )}
        <Grid item md={12} xs={12}>
          <TextField
            variant="outlined"
            multiline
            label={i18n.__('pages.FormEvent.description')}
            className={classes.field}
            value={state.description}
            error={!!errors.description}
            helperText={errors.description}
            onChange={(e) => setState({ description: e.target.value })}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default InformationsForm;

InformationsForm.propTypes = {
  stateHook: PropTypes.arrayOf(PropTypes.any).isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
};
