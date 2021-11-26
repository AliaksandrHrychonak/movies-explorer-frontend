import React from "react";
import './SwitchButton.css';
const SwitchButton = ({ state, onChange}) => {
  
  return (
    <div className="switch">
      <input
        checked={state}
        onChange={onChange}
        className="switch__checkbox"
        id="switch"
        type="checkbox"
      />
      <label
        className="switch__label"
        htmlFor="switch"
      >
      <span className="switch__button" />
      </label>
      <p className="switch__title">Короткометражки</p>
    </div>
  );
};

export default SwitchButton;
