import React from 'react';
import 'Components/EventTag/eventTag.styles.css';

const EventTag = ({ tag }) => {
  const tagColor = (tag) => {
    switch (tag) {
      case 'CANVASS':
        return {
          backgroundColor: 'red',
        };
      case 'PHONE_BANK':
        return {
          backgroundColor: 'red',
        };
      case 'FUNDRAISER':
        return {
          backgroundColor: 'red',
        };
      case 'VOTER_REG':
        return {
          backgroundColor: 'green',
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
          backgroundColor: 'red',
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
    <div className="tag" style={tagColor(tag)}>
      {tag.replace(new RegExp('_', 'g')," ")}
    </div>
  );
};

export default EventTag;
