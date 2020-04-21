import React from 'react';

const EVENT_TYPES = [
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

const formatEventTypes = (event) => event.replace(new RegExp('_', 'g'), ' ').toLowerCase();

const AddEventFilter = ({ handleChange, eventTypeQuery,collectionEventTypeQueries, doneAddingEvents }) => {
  return (
    <div>
      <form className="form">
      {EVENT_TYPES.map((event, i) => (
        <div key={i} className="event-type-option">
          <input
            type="checkbox"
            id={event}
            name={event}
            value={event}
            hidden
            onClick={handleChange}
          />
          <label for={event} value={event}>
            {formatEventTypes(event)}
          </label>
        </div>
      ))}
      <button cancelable="true" onClick={(event) => doneAddingEvents(event)}>
          submit
      </button>
        </form>
    </div>
  );
};

export default AddEventFilter;
