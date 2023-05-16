import axios from 'axios';
import ROUTES from '../../../ui/layouts/routes';

const sendnotif = ({ groups, participants, title, eventId, content }) => {
  const [apiKey] = Meteor.settings.private.apiKeys;
  axios.defaults.baseURL = Meteor.settings.public.laboiteUrl;
  axios.defaults.headers.common['X-API-KEY'] = apiKey;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  try {
    axios
      .post('/api/notifications', {
        groupsId: groups.map((g) => g._id),
        content,
        title,
        link: `${Meteor.absoluteUrl()}${ROUTES.EVENT_MAKE(eventId).replace('/', '')}`,
      })
      .then(() => console.log(`Send multi groups notif ok for event: ${eventId}`))
      .catch((err) => console.log(err));
    participants.forEach(async ({ _id, groupId }) => {
      if (!groupId) {
        await axios.post('/api/notifications', {
          userId: _id,
          content,
          title,
          type: 'info',
          link: `${Meteor.absoluteUrl()}${ROUTES.EVENT_MAKE(eventId).replace('/', '')}`,
        });
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export default sendnotif;
