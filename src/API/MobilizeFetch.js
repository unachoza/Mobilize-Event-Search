const MOBILZE_BASE_URL = 'https://api.mobilize.us/v1/events';

const MOBILZE_BASE_URL_OPTION= 'https://api.mobilize.us/v1/events?event_types=CANVASS&zipcode=92137&per_page=10'

export const eventsFetch = (requestURL) => {
  return fetch(
    `${requestURL}`
  );
};

