// SignIn.jsx
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import AuthForm from "../components/AuthForm";
import './../styles/AuthForm.css';
export default function SignIn() {
  const navigate = useNavigate();
  const handleLogin = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/dashboard");
  };
  return <div>
  <AuthForm onSubmit={handleLogin} buttonText="Sign In" />
  <p className="switch-link" onClick={() => navigate("/signup")}>
    Go to Sign Up
  </p>
</div>;
}
