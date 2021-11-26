import React from 'react';
import './ButtonCross.css';

const ButtonCross = ({ event }) => {
  return (
    <button className="button__cross" onClick={event} />
  );
}

export default ButtonCross;
