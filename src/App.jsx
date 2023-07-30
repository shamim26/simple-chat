import "./App.css";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="main">
      {!user && <Login />}
      {user && <Chat />}
    </div>
  );
}

export default App;
