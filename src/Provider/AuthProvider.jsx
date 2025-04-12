import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "../Firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to handle user login and registration
  const handleAuth = (authMethod, email, password) => {
    setLoading(true);
    return authMethod(auth, email, password);
  };

  // Handle logout and cleanup
  const logOut = () => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        localStorage.removeItem("access-token");
        setUser(null);
      })
      .finally(() => setLoading(false));
  };

  // Update the user profile (name and photo)
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, { displayName: name, photoURL });
  };

  // Google sign-in
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Fetch JWT token and update user on auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        axiosPublic.post("/jwt", { email: currentUser.email })
          .then(({ data }) => {
            const token = data.token;
            if (token) {
              localStorage.setItem("access-token", token);
            }
          })
          .catch((err) => console.error("JWT fetch error:", err))
          .finally(() => setLoading(false));
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    createUser: (email, password) => handleAuth(createUserWithEmailAndPassword, email, password),
    signIn: (email, password) => handleAuth(signInWithEmailAndPassword, email, password),
    logOut,
    updateUserProfile,
    googleSignIn,
  };

  return (
    <>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
