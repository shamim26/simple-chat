import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase.config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleSignIn = () => {
    signInWithPopup(auth, provider);
    setLoading(true);
  };

  const logOut = () => signOut(auth);

  const authInfo = {
    user,
    setUser,
    googleSignIn,
    logOut,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
