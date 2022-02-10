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
  LOGOUT: '/logout',
  ADD_EVENT: '/add-event',
  ADD_EVENT_TO_DATE: ({ date, start, end }) => `/add-event?${queryStringMaker({ date, start, end })}`,
  EVENT: '/event/:_id',
  EVENT_MAKE: (id) => `/event/${id}`,
  EVENT_EDIT: '/edit-event/:_id',
  EVENT_EDIT_MAKE: (id) => `/edit-event/${id}`,
};

export default ROUTES;
