import { React, useState, useEffect } from "react";
import "./textBox.css";

const ChatBox = (props) => {
  const [username, setUserName] = useState("");

  useEffect(() => {
    const propsChecker = () => {
      setUserName(props.profieUser.username);
      console.log(username);
    };
    propsChecker();
  });

  return (
    <div className="textBoxEl">
      <div className="profileAvatar">
        {Array.from(username.toUpperCase()[0])}
      </div>
      <textarea rows={6} cols={88}></textarea>
      <button className="submitBtnEl">SEND</button>
    </div>
  );
};

export default ChatBox;
