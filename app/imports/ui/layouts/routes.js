const queryStringMaker = (query) => {
  const searchParams = new URLSearchParams('');
  Object.keys(query).forEach((key) => {
    if (query[key]) {
      searchParams.append(key, query[key]);
    }
  });
  return searchParams.toString();
};

const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  ADD_EVENT: '/add-event',
  ADD_EVENT_TO_DATE: ({ date, start, end }) => `/add-event?${queryStringMaker({ date, start, end })}`,
  ADD_EVENT_TO_GROUP: ({ groupId }) => `/add-event?${queryStringMaker({ groupId })}`,
  EVENT: '/event/:_id',
  EVENT_MAKE: (id) => `/event/${id}`,
  EVENT_EDIT: '/edit-event/:_id',
  EVENT_EDIT_MAKE: (id) => `/edit-event/${id}`,
};

export default ROUTES;
