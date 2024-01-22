// eslint-disable-next-line no-restricted-imports
import { Paper, Modal, Typography, Button } from '@material-ui/core';
import React, { useState } from 'react';
import i18n from 'meteor/universe:i18n';
// eslint-disable-next-line import/no-extraneous-dependencies
import Bowser from 'bowser';
import { useAppContext } from '../contexts/context';
import PackageJSON from '../../../package.json';

const AboutPage = () => {
  const [{ isMobile }] = useAppContext();

  const style = {
    imageSize: {
      height: '10vw',
      placeContent: 'center',
    },
    marginRight: {
      marginRight: '-10vw',
    },
    paper: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      padding: '5%',
    },
    containerPaper: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      marginTop: isMobile ? '10vh' : '5vw',
      padding: 10,
      placeItems: 'center',
      overflow: 'auto',
    },
    imgContainer: {
      display: 'flex',
      width: '25%',
      justifyContent: 'center',
    },
    textZone: {
      width: isMobile ? '100%' : '50vw',
    },
    links: {
      color: 'blue',
      textDecoration: 'underline',
      cursor: 'auto',
    },
  };
  const [isOpen, setIsOpen] = useState(false);
  const bowser = Bowser.parse(window.navigator.userAgent);
  const { browser, os, platform } = bowser;

  const { version } = PackageJSON;

  const handleClickModal = () => {
    navigator.clipboard.writeText(
      `Navigateur: ${browser.name},
                 Version: ${JSON.stringify(browser.version)},
                 Os: ${JSON.stringify(os.name)},
                 Appareil: ${JSON.stringify(platform.type)}`,
    );
    msg.success(i18n.__('pages.AboutPage.Modal.success'));

    setIsOpen(false);
  };

  return (
    <>
      <Paper style={style.containerPaper}>
        <div style={style.imgContainer}>
          <img style={style.imageSize} src="/images/puce_eole.png" alt="puce eole" />
        </div>
        <div style={style.textZone}>
          <Typography variant={isMobile ? 'h6' : 'h3'}>
            <i style={{ color: '#372F84' }}>Agenda - version {version}</i>
          </Typography>
          <p>
            {i18n.__('pages.AboutPage.developped')}{' '}
            <a
              style={style.links}
              title="EUPL 1.2"
              target="_blank"
              rel="noreferrer noopener"
              href="https://eupl.eu/1.2/fr/"
            >
              EUPL 1.2
            </a>{' '}
            {i18n.__('pages.AboutPage.socle')}{' '}
            <a
              style={style.links}
              title="EOLE 3"
              target="_blank"
              rel="noreferrer noopener"
              href="https://pcll.ac-dijon.fr/eole/eole-3/"
            >
              EOLE³
            </a>
          </p>
          <p>
            {i18n.__('pages.AboutPage.by')}{' '}
            <a
              style={style.links}
              title="PCLL"
              target="_blank"
              rel="noreferrer noopener"
              href="https://pcll.ac-dijon.fr/pcll/"
            >
              Pôle de Compétences Logiciels Libres
            </a>{' '}
            {i18n.__('pages.AboutPage.and')}{' '}
            <a
              style={style.links}
              title="MENJ"
              target="_blank"
              rel="noreferrer noopener"
              href="https://www.education.gouv.fr/"
            >
              Ministère de l`&apos;`Éducation Nationale et de la Jeunesse
            </a>{' '}
            {i18n.__('pages.AboutPage.contributions')}{' '}
            <a
              style={style.links}
              title="DINUM"
              target="_blank"
              rel="noreferrer noopener"
              href="https://www.numerique.gouv.fr/dinum/"
            >
              Direction Interministérielle du Numérique
            </a>{' '}
            {i18n.__('pages.AboutPage.external')}
          </p>
          <p>
            {i18n.__('pages.AboutPage.links')}{' '}
            <a
              style={style.links}
              title="wiki eole"
              target="_blank"
              rel="noreferrer noopener"
              href="https://wiki.eole.education/"
            >
              documentation du service.
            </a>
          </p>
          <p>
            {i18n.__('pages.AboutPage.exchange')}{' '}
            <a
              style={style.links}
              title={i18n.__('pages.AboutPage.chat')}
              target="_blank"
              rel="noreferrer noopener"
              href="https://chat.mim-libre.fr"
            >
              {i18n.__('pages.AboutPage.chat')}.
            </a>
          </p>
          <p>
            {i18n.__('pages.AboutPage.news')}{' '}
            <a
              style={style.links}
              title="Mastodon"
              target="_blank"
              rel="noreferrer noopenner"
              href="https://mastodon.eole.education/@EOLE"
            >
              Mastodon.
            </a>
          </p>
          <p>
            <p>
              {i18n.__('pages.AboutPage.contributing')}{' '}
              <a
                style={style.links}
                title={i18n.__('pages.AboutPage.deposit')}
                target="_blank"
                rel="noreferrer noopenner"
                href="https://gitlab.mim-libre.fr/alphabet/agenda"
              >
                {i18n.__('pages.AboutPage.deposit')}.
              </a>
            </p>
          </p>
          <Button sx={{ marginTop: '5vh' }} color="primary" variant="contained" onClick={() => setIsOpen(true)}>
            {i18n.__('pages.AboutPage.information')}
          </Button>
        </div>
      </Paper>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <Paper style={style.paper}>
          <Typography variant="h4">{i18n.__('pages.AboutPage.Modal.information')}</Typography>
          <p>
            {i18n.__('pages.AboutPage.Modal.navigator')} {JSON.stringify(browser.name)}
          </p>
          <p>
            {i18n.__('pages.AboutPage.Modal.version')} {JSON.stringify(browser.version)}
          </p>
          <p>
            {i18n.__('pages.AboutPage.Modal.os')} {JSON.stringify(os.name)}
          </p>
          <p>
            {i18n.__('pages.AboutPage.Modal.device')} {JSON.stringify(platform.type)}
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button color="primary" variant="contained" onClick={() => setIsOpen(false)}>
              {i18n.__('pages.AboutPage.Modal.close')}
            </Button>
            <Button color="primary" variant="contained" onClick={() => handleClickModal()}>
              {i18n.__('pages.AboutPage.Modal.copy')}
            </Button>
          </div>
        </Paper>
      </Modal>
    </>
  );
};

export default AboutPage;
