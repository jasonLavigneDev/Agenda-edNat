import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import i18n from 'meteor/universe:i18n';
import { useAppContext } from '../../contexts/context';
import { getAppSettingsLinks } from '../../../api/appsettings/methods';

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

export const LEGAL_ROUTES = {
  legal: 'legalnotice',
  personalData: 'personal-data',
  accessibility: 'accessibility',
  gcu: 'conditions',
};

const Footer = () => {
  const classes = useStyles();
  const [{ isMobile }] = useAppContext();
  const laboiteURL = Meteor.settings.public.laboiteUrl;
  const [settingsData, setSettingsData] = useState([]);

  const toolbarContent = () => {
    return (
      <>
        {settingsData.map(({ key, external, link, text }) => {
          return isMobile ? (
            <li key={key} className={classes.li}>
              {external ? (
                <a className={classes.mobileLink} target="_blank" href={link} rel="noreferrer noopener">
                  {i18n.__(`components.Footer.${text}`)}
                </a>
              ) : (
                <a
                  className={classes.mobileLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  href={`${laboiteURL}/legal/${link}`}
                >
                  {i18n.__(`components.Footer.${text}`)}
                </a>
              )}
            </li>
          ) : external ? (
            <a key={key} className={classes.link} target="_blank" href={link} rel="noreferrer noopener">
              {i18n.__(`components.Footer.${text}`)}
            </a>
          ) : (
            <a className={classes.link} target="_blank" rel="noreferrer noopener" href={`${laboiteURL}/legal/${link}`}>
              {i18n.__(`components.Footer.${text}`)}
            </a>
          );
        })}
      </>
    );
  };

  useEffect(() => {
    let isCancelled = false;
    getAppSettingsLinks.call(null, (error, result) => {
      const newData = { ...result };
      delete newData._id;
      const keys = Object.keys(newData);
      const appsettings = keys.map((key) => ({
        key,
        external: newData[key].external,
        link: newData[key].external ? newData[key].link : LEGAL_ROUTES[key],
        text: key,
      }));
      if (!isCancelled) setSettingsData(appsettings);
    });
    return () => {
      // fix to avoid modifying component after unmounting
      // see : https://stackoverflow.com/questions/56442582/react-hooks-cant-perform-a-react-state-update-on-an-unmounted-component/56443045#56443045
      isCancelled = true;
    };
  }, []);

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
