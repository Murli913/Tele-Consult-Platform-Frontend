import React from 'react';
import './GroupCallButton.css';
import { MdCallEnd } from "react-icons/md";

const GroupCallButton = ({ onClickHandler}) => {
  return (
    <button onClick={onClickHandler} className='group_call_button background_main_color'>
      <MdCallEnd />
    </button>
  );
};

export default GroupCallButton;
