import React from 'react';
import './EntryTitle.css'

const EntryTitle = ({ title, number }) => {
  return (
    React.createElement(
      `h${number}`,
      { className: "title" },
      `${title}`
    )
  );
}

export default EntryTitle;
