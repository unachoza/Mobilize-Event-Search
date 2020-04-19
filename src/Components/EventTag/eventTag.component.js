import React from 'react';
// import {DATE_FILTER} from 'Constations/constans'
import 'Components/EventTag/eventTag.styles.css';

const EventTagFooter = ({ eventTags: { eventType, eventDate } }) => {

  const translateUnixToDateRange = (eventDate) => {
    if (eventDate.start >= Math.round(new Date().getTime() / 1000)) {
      return 'current';
    }
    else if ((eventDate.start >= 1577836800) && (eventDate.end_date < 1583020801)) {
      return 'date_JAN_2020';
    }

    else if (eventDate.start >= 1580515200 && eventDate.end_date < 1583020810) {
      return 'date_FEB_2020';
    }

    else if (eventDate.start >=  1583020800 && eventDate.end_date < 1585612800) {
      return 'date_MAR_2020';
    }

    else if (eventDate.start >= 1585699200 && eventDate.end_date < 1588204800) {
      return 'date_APRIL_2020';
    }

    else if (eventDate.start >= 1588291200 && eventDate.end_date < 1590883200) {
      return 'date_MAY_2020';
    }

    else if (eventDate.start < 1577836800) {
      return 'PASSED';
    }
    return 'PASSED';
  }
  console.log(eventDate.start >= 1588291200 && eventDate.end_date < 1590883200);
  console.log(eventDate.start)
   console.log(eventDate.end_date)
  console.log(translateUnixToDateRange(eventDate));

  // return (eventDate.start >= 1577836800) && (eventDate.end_date < 1580428800) ? eventDate = 'date_JAN_2020'

  const tagColor = (eventType) => {
    switch (eventType) {
      case 'CANVASS':
        return {
          backgroundColor: '#FF8B32',
        };
      case 'PHONE_BANK':
        return {
          backgroundColor: 'red',
        };
      case 'FUNDRAISER':
        return {
          backgroundColor: 'green',
        };
      case 'VOTER_REG':
        return {
          backgroundColor: '#DE0700',
        };
      case 'TRAINING':
        return {
          backgroundColor: 'red',
        };
      case 'DEBATE_WATCH_PARTY':
        return {
          backgroundColor: 'red',
        };
      case 'TOWN_HALL':
        return {
          backgroundColor: 'red',
        };
      case 'BARNSTORM':
        return {
          backgroundColor: '#004ac7',
        };
      case 'SIGNATURE_GATHERING':
        return {
          backgroundColor: 'red',
        };
      default:
        return {
          backgroundColor: 'blue',
        };
    }
  };

  return (
    <div>
      <div className="tag" style={tagColor(eventType)}>
        {eventType.replace(new RegExp('_', 'g'), ' ')}
      </div>
      <div className="tag" style={{ backgroundColor: 'black' }}>
        {translateUnixToDateRange(eventDate).replace(new RegExp('date_', 'g'), ' ')}
      </div>
    </div>
  );
};

export default EventTagFooter;
