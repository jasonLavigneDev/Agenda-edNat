import React from 'react';
import i18n from 'meteor/universe:i18n';
import Button from '@material-ui/core/Button';

const notFoundStyle = {
  fontStyle: 'WorkSansRegular',
  textAlign: 'center',
  marginTop: '10%',
  overflowY: 'hidden',
  scrollBarWidth: 'none',
};

const linkStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  textDecoration: 'underline',
  display: 'inline',
  margin: 0,
  padding: 0,
};

export default function UserFailed() {
  return (
    <>
      <div style={notFoundStyle}>
        <h3 style={notFoundStyle}>
          {`${i18n.__('components.UserFailed.loginMsg')} `}
          <button type="button" style={linkStyle} onClick={() => Meteor.loginWithKeycloak()}>
            {i18n.__('components.UserFailed.loginLink')}
          </button>
        </h3>
        <Button
          variant="contained"
          color="primary"
          style={{ fontStyle: 'WorkSansRegular' }}
          onClick={() => window.open(`${Meteor.settings.public.laboiteUrl}/signin`, '_blank')}
        >
          {i18n.__('components.UserFailed.loginLaboite')}
        </Button>
      </div>
    </>
  );
}
