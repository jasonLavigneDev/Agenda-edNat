import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';

import { useAppContext } from '../../contexts/context';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const useStyles = (isMobile) =>
  makeStyles(() => ({
    modal: {
      '& .MuiDialog-paperWidthSm': {
        minWidth: isMobile ? '95%' : 800,
        maxWidth: '70%',
        minHeight: '50%',
      },
    },
  }));

const ModalWrapper = ({ open, onClose, title, children, loading, buttons = [] }) => {
  const [{ isMobile }] = useAppContext();
  const classes = useStyles(isMobile)();

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      className={classes.modal}
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {buttons.map(
          (b) =>
            !!b.text && (
              <Button key={b.key} {...b.props} disabled={loading} variant="contained" onClick={b.onClick}>
                {b.text}
              </Button>
            ),
        )}
      </DialogActions>
    </Dialog>
  );
};

ModalWrapper.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
  loading: PropTypes.bool,
  buttons: PropTypes.arrayOf(PropTypes.any).isRequired,
};

ModalWrapper.defaultProps = {
  loading: false,
};

export default ModalWrapper;
