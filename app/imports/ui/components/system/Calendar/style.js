import { makeStyles } from '@material-ui/core/styles';

const useCalendarStyles = (isMobile) =>
  makeStyles((theme) => ({
    hidden: {
      display: 'none',
    },
    container: {
      padding: '80px 15px 15px 15px',
      '& button.fc-button': {
        backgroundColor: theme.palette.primary.main,
        borderColor: 'transparent',
      },
      '& button.fc-button.fc-button-active,button.fc-button:hover': {
        backgroundColor: `${theme.palette.primary.dark} !important`,
      },
      '& button.fc-button:disabled': {
        backgroundColor: theme.palette.primary.dark,
      },
      '& .fc-toolbar': {
        flexDirection: isMobile ? 'column-reverse' : 'row',
      },
      '& .fc-toolbar-chunk:nth-child(2)': {
        order: isMobile ? 2 : null,
      },
      '& .fc-toolbar-chunk': {
        width: isMobile ? '100%' : 'auto',
        textAlign: 'center',
        marginTop: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '& > .fc-button-group': {
          marginBottom: 5,
          marginLeft: '0rem !important',
        },
        '& > .fc-button': {
          width: '100%',
          marginLeft: '0rem !important',
        },
      },
    },
  }));

export default useCalendarStyles;
