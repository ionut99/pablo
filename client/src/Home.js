import React from "react";
import { Link } from "react-router-dom";

import "./css/Home.css";

const Home = () => {
  const [roomName, setRoomName] = React.useState("");
  const [userName, setUserName] = React.useState("");

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  return (
    <div className="home-container">
      <input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
      /><br />
      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={handleUserNameChange}
        className="text-input-field"
      />
      
      <Link to={`/${roomName}/${userName}`} className="enter-room-button">
        Join room
      </Link>
    </div>
  );
};

export default Home;