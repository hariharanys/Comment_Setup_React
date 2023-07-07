import "./App.css";
import { React, useState, useEffect } from "react";
import { fetchData } from "./controller/fetch";
import replyIcon from "./images/icon-reply.svg";
import incrementIcon from "./images/icon-plus.svg";
import decrementIcon from "./images/icon-minus.svg";
import ChatBox from "./textBox";
import imageJuliusomo from "./images/avatars/image-juliusomo.png";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [comments, setComments] = useState([]);
  const [useDetails, setUserDetails] = useState([]);
  const [userAvatar, setUserAvatar] = useState({});
  const [profieUser, setProfileUser] = useState("juliusomo");

  useEffect(() => {
    const fetchDataProcess = async () => {
      try {
        const processData = await fetchData();
        const userProfile = processData.currentUser;
        const commentSection = processData.comments;
        setCurrentUser(userProfile);
        setComments(commentSection);
        const userInfo = commentSection.map((e) => e.user);
        setUserDetails(userInfo);
        const userImg = userInfo.map((e) => e.image);
        setUserAvatar(userImg);
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataProcess();
  }, []);

  useEffect(() => {
    console.log(currentUser);
    console.log(comments);
    console.log(useDetails);
    console.log(userAvatar);
  }, [currentUser, comments, useDetails, userAvatar]);

  return (
    <div className="App">
      <div className="conatinerEl">
        <div className="commentCard">
          {comments.map((e, i) => (
            <div className="cardEl">
              <div className="scoreEl">
                <img alt="load again" src={incrementIcon} />
                <p>{e.score}</p>
                <img alt="load again" src={decrementIcon} />
              </div>
              <div className="commentSectionEl">
                <div className="profileHeaderEl">
                  <div className="profileContentEl">
                    <div className="profileAvatar">
                      {Array.from(e.user.username.toUpperCase())[0]}
                    </div>
                    <p className="userNameEl">{e.user.username}</p>
                    <p className="createEl">{e.createdAt}</p>
                  </div>
                  <img
                    src={replyIcon}
                    alt="load again"
                    onClick={() => console.log(i)}
                  />
                </div>
                <div>
                  <p className="contentEl">{e.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ChatBox profieUser={currentUser} />
    </div>
  );
}

export default App;
