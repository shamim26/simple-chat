import { useContext, useEffect, useRef, useState } from "react";
import "./Chat.css";
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { AuthContext } from "../../context/AuthProvider";
import Message from "../Message/Message";

const Chat = () => {
  const { user, logOut } = useContext(AuthContext);
  const [sendMessage, setSendMessage] = useState("");
  const [message, setMessage] = useState([]);
  const endView = useRef();

  useEffect(() => {
    endView.current.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // read the messages from database
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessage(messages);
    });

    return () => unsubscribe();
  }, []);

  // send messages to database
  const handleSend = async (e) => {
    e.preventDefault();

    if (sendMessage.trim() === "") {
      setSendMessage("");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        name: user?.displayName,
        text: sendMessage,
        createdAt: serverTimestamp(),
        uid: user?.uid,
        photo: user?.photoURL,
      });
    } catch (err) {
      console.log(err);
    }
    setSendMessage("");
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div style={{ marginTop: "auto" }}>
          {message.map((msg) => (
            <Message key={msg.id} msg={msg}></Message>
          ))}
        </div>
        <div ref={endView}></div>
        <form onSubmit={handleSend} className="message-area">
          <input
            onChange={(e) => setSendMessage(e.target.value)}
            className="input-message"
            type="text"
            value={sendMessage}
          />
          <button type="submit" className="send">
            send
          </button>
        </form>
      </div>
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default Chat;
