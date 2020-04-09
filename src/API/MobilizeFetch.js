const MOBILZE_BASE_URL = 'https://api.mobilize.us/v1/events';

const MOBILZE_BASE_URL_OPTION= 'https://api.mobilize.us/v1/events?event_types=CANVASS&zipcode=92137&per_page=10'

const eventsFetch = async (requestURL) => {
   console.log('start in api');
  
   const response = await fetch(
    `${requestURL}`
  )
    const data = await response.json();
    const fetchedEvents = await data.data.map((event) => {
      return {
        id: event.id,
        eventType: event.event_type,
        title: event.title,
        details: event.description,
        zipcode: event.location?.postal_code || null,
        coordinates: event.location?.location || null,
        eventDate: {
          start: event.timeslots[0]?.start_date || null,
          end_date: event.timeslots[0]?.end_date || null,
        },
        url: event.browser_url || null,
        eventImg: event.featured_image_url || null,
        show: false,
      };
    });
  return fetchedEvents
};

export default eventsFetch

