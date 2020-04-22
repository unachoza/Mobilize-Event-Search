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

const AddEventFilter = ({ handleEventFilters, doneAddingEvents }) => {
  return (
    <div>
      <form className="form">
        {EVENT_TYPES.map((event, i) => (
          <div key={i} className="event-type-option">
            <input type="checkbox" id={event} name={event} value={event} hidden onClick={handleEventFilters} />
            <label for={event} value={event}>
              {formatEventTypes(event)}
            </label>
          </div>
        ))}
        <span style={{ display: 'flex', margin: '0px auto' }}>
          <button onClick={(event) => doneAddingEvents(event)}>submit</button>
        </span>
      </form>
    </div>
  );
};

export default AddEventFilter;
