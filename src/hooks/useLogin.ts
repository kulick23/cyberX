import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../components/AuthProvider";
import { ROUTES } from "../constants/routes";

export const useLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(ROUTES.MENU);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate(ROUTES.MENU);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate(ROUTES.LOGIN);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    email,
    password,
    error,
    isRegistering,
    currentUser,
    setEmail,
    setPassword,
    setIsRegistering,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
