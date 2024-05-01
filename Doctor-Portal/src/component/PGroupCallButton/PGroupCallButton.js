import React from 'react';
import './PGroupCallButton.css';

const PGroupCallButton = ({ onClickHandler, label }) => {
  return (
    <button onClick={onClickHandler} className='group_call_button background_main_color'>
      { label }
    </button>
  );
};

export default PGroupCallButton;
