import { Meteor } from 'meteor/meteor';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import i18n from 'meteor/universe:i18n';
import { useAppContext } from '../../contexts/context';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    height: '100%',
  },
  link: {
    color: theme.palette.tertiary.main,
    textDecoration: 'none',
    outline: 'none',
    marginRight: 25,
    fontFamily: 'WorkSansBold',
  },
  mobileLink: {
    flexDirection: 'column',
    color: theme.palette.tertiary.main,
    textDecoration: 'none',
    outline: 'none',
    marginRight: 25,
    fontFamily: 'WorkSansBold',
  },
  blog: {
    color: theme.palette.tertiary.main,
    fontFamily: 'WorkSansBold',
  },
  li: {
    listStyle: 'none',
  },
}));

export const footer = [
  {
    text: 'legal',
    path: '/legal/legalnotice',
  },
  {
    text: 'accessibility',
    path: '/legal/accessibility',
  },
  {
    text: 'gcu',
    path: '/legal/conditions',
  },
  {
    text: 'personalData',
    path: '/legal/personal-data',
  },
  {
    text: 'contact',
    path: '/contact',
  },
];

const Footer = () => {
  const classes = useStyles();
  const [{ isMobile }] = useAppContext();
  const { laboiteURL } = Meteor.settings.public;

  const toolbarContent = () => {
    return (
      <>
        {footer.map(({ path, text }) => {
          return isMobile ? (
            <li key={text} className={classes.li}>
              <a className={classes.mobileLink} target="_blank" href={`${laboiteURL}${path}`} rel="noreferrer noopener">
                {i18n.__(`components.Footer.${text}`)}
              </a>
            </li>
          ) : (
            <a
              key={text}
              className={classes.link}
              target="_blank"
              href={`${laboiteURL}${path}`}
              rel="noreferrer noopener"
            >
              {i18n.__(`components.Footer.${text}`)}
            </a>
          );
        })}
      </>
    );
  };

  return (
    <AppBar style={{ position: 'relative' }}>
      {isMobile ? (
        <Toolbar className={classes.root}>
          <ul>{toolbarContent()}</ul>
        </Toolbar>
      ) : (
        <Toolbar className={classes.root}>
          <div>{toolbarContent()}</div>
        </Toolbar>
      )}
    </AppBar>
  );
};
export default Footer;
