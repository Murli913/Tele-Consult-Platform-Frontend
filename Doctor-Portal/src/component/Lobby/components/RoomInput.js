import React from "react";

const RoomInput = (props) => {
  const { roomId, setRoomId } = props;
  return (
    <div className="login-page_input_container ">
      <input
        placeholder="Enter RoomId"
        type="text"
        value={roomId}
        onChange={(event) => {
          setRoomId(event.target.value);
        }}
        className="login-page_input background_main_color text_main_color"
      />
    </div>
  );
};

export default RoomInput;
