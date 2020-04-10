import React from 'react';

const eventTypes = [
  'canvass',
  'phone_bank ',
  'fundraiser',
  'voter_reg',
  'training',
  'debate_watch_party',
  'town_hall',
  'barnstorm',
  'signature_gathering',
];

const AddEventFilter = ({handleChange, eventTypeQuery }) => (
  <form className="form" onSubmit={(label) => eventTypeQuery(label)}>
    {eventTypes.map((event, i) => {
      return (
        <div key={i} className="event-type-option">
          <input type="checkbox" id={event} name={event} value={event} hidden onClick={handleChange} />
          <label for={event} value={event}>
            {event.replace(new RegExp('_', 'g'), ' ').toLowerCase()}
          </label>
        </div>
      );
    })}
    <input type="submit" value="submit" />
  </form>
);

export default AddEventFilter
