const normalizeEventData = (event) => ({
  id: event.id,
  eventType: event.event_type,
  title: event.title,
  details: event.description,
  zipcode: event.location?.postal_code || null,
  coordinates: {
    lat: event.location?.location?.latitude || null,
    lng: event.location?.location?.longitude || null,
  },
  eventDate: {
    start: event.timeslots[0]?.start_date || null,
    end_date: event.timeslots[0]?.end_date || null,
  },
  url: event.browser_url || null,
  eventImg: event.featured_image_url || null
});


const eventsFetch = async (requestURL) => {
  console.log(requestURL);
  const response = await fetch(`${requestURL}`);
  const data = await response.json();
  return data.data.map((event) => normalizeEventData(event));
};
export default eventsFetch;


