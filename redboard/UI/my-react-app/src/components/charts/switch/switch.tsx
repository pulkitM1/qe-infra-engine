// Switch.js
import React from 'react';
import '../../../App.css';

interface SwitchProps {
  isOn: boolean;
  handleToggle: () => void;
  imgOn: string; // path to the image when the switch is on
  imgOff: string; // path to the image when the switch is off
}

export const Switch: React.FC<SwitchProps> = ({ isOn, handleToggle, imgOn, imgOff }) => {
  return (
    <button className={`switch ${isOn ? 'switch-on' : 'switch-off'} no-outline-button`} onClick={handleToggle}>
    <img src={isOn ? imgOn : imgOff} alt="Toggle" className="switch-img" />
  </button>
  );
};
