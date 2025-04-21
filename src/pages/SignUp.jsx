// SignUp.jsx
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import AuthForm from "../components/AuthForm";
import './../styles/AuthForm.css';
export default function SignUp() {
  const navigate = useNavigate();
  const handleRegister = async (email, password) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date()
      });
    navigate("/dashboard");
  };
  return <div>
 <AuthForm onSubmit={handleRegister} buttonText="Sign Up" />
 <p className="switch-link" onClick={() => navigate("/")}>
    Go to Sign in.
  </p>
  </div>;
 
}
