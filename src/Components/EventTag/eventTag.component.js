import React from 'react';
// import {DATE_FILTER} from 'Constations/constans'
import 'Components/EventTag/eventTag.styles.css';

const EventTagFooter = ({ eventTags: { eventType, eventDate, link } }) => {
  const translateUnixToDateRange = (eventDate) => {
    if (eventDate.start >= Math.round(new Date().getTime() / 1000)) {
      return 'CURRENT';
    } else if (eventDate.start >= 1588291200 && eventDate.end_date < 1590883200) {
      return 'MAY_2020';
    } else if (eventDate.start < 1577836800) {
      return 'PASSED';
    }
    return 'PASSED';
  };
  
  const removeUnderscores = (input) => input.replace(new RegExp('_', 'g'), ' ');
  return (
    <div className="tag-footer">
      <div className="tag" style={{ backgroundColor: '#004ac7' }}>
        {removeUnderscores(eventType)}
      </div>
      <div className="tag" style={{ backgroundColor: '#3CB371' }}>
        <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'white', }}>
          JOIN EVENT
        </a>
      </div>
      <div className="tag" style={{ backgroundColor: '#474747' }}>
        {removeUnderscores(translateUnixToDateRange(eventDate))}
      </div>
    </div>
  );
};

export default EventTagFooter;


// const tagColor = (eventType) => {
//     switch (eventType) {
//       case 'CANVASS':
//         return {
//           backgroundColor: '#FF8B32',
//         };
//       case 'PHONE_BANK':
//         return {
//           backgroundColor: 'red',
//         };
//       case 'FUNDRAISER':
//         return {
//           backgroundColor: 'green',
//         };
//       case 'VOTER_REG':
//         return {
//           backgroundColor: '#DE0700',
//         };
//       case 'TRAINING':
//         return {
//           backgroundColor: 'red',
//         };
//       case 'DEBATE_WATCH_PARTY':
//         return {
//           backgroundColor: 'red',
//         };
//       case 'TOWN_HALL':
//         return {
//           backgroundColor: 'red',
//         };
//       case 'BARNSTORM':
//         return {
//           backgroundColor: '#004ac7',
//         };
//       case 'SIGNATURE_GATHERING':
//         return {
//           backgroundColor: 'red',
//         };
//       default:
//         return {
//           backgroundColor: 'blue',
//         };
//     }
//   };