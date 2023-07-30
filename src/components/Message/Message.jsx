import { useContext } from "react";
import "./Message.css";
import { AuthContext } from "../../context/AuthProvider";

const Message = ({ msg }) => {
  const { user } = useContext(AuthContext);
  return (
    <div
      className={
        user?.uid === msg?.uid
          ? "message-position-end"
          : "message-position-start"
      }
    >
      <p
        className={`message ${
          user?.uid === msg?.uid ? "msg-border-end" : "msg-border-start"
        } `}
      >
        {msg?.text}
      </p>
      <img
        style={{ width: "30px", height: "30px", borderRadius: "50%" }}
        src={msg?.photo}
        alt=""
      />
    </div>
  );
};

export default Message;
