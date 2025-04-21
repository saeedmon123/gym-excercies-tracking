import { useState } from "react";
import './../styles/AuthForm.css';
export default function AuthForm({ onSubmit, buttonText }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(email, password);
  };

return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit}>
        <h2>{buttonText}</h2>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">{buttonText}</button>
      </form>
    </div>
  );
}

