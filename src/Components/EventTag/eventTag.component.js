import React from 'react';
// import {DATE_FILTER} from 'Constations/constans'
import 'Components/EventTag/eventTag.styles.css';

const EventTagFooter = ({ eventTags: { eventType, eventDate } }) => {
  const translateUnixToDateRange = (eventDate) => {
    if (eventDate.start >= Math.round(new Date().getTime() / 1000)) {
      return 'CURRENT';
    } else if (eventDate.start >= 1577818800 && eventDate.end_date < 1583020801) {
      return 'JAN_2020';
    } else if (eventDate.start >= 1580515200 && eventDate.end_date < 1583020810) {
      return 'FEB_2020';
    } else if (eventDate.start >= 1583020800 && eventDate.end_date < 1585612800) {
      return 'MAR_2020';
    } else if (eventDate.start >= 1585699200 && eventDate.end_date < 1588204800) {
      return 'APRIL_2020';
    } else if (eventDate.start >= 1588291200 && eventDate.end_date < 1590883200) {
      return 'MAY_2020';
    } else if (eventDate.start < 1577836800) {
      return 'PASSED';
    }
    return 'PASSED';
  };
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
  const removeUnderscores = (input) => input.replace(new RegExp('_', 'g'), ' ');
  return (
    <div className="tag-footer">
      <div className="tag" style={tagColor(eventType)}>
        {removeUnderscores(eventType)}
      </div>
      <div className="tag" style={{ backgroundColor: 'black' }}>
        {removeUnderscores(translateUnixToDateRange(eventDate))}
      </div>
    </div>
  );
};

export default EventTagFooter;
