import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import './../styles/ExerciseForm.css';
export default function ExerciseForm({ userId, day }) {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");

  const handleAdd = async e => {
    e.preventDefault();
    await addDoc(collection(db, `users/${userId}/days/${day}/exercises`), {
      name,
      maxWeight: Number(weight),
      createdAt: new Date()
    });
    setName("");
    setWeight("");
  };

  return (
    <form className="exercise-form" onSubmit={handleAdd}>
      <input
        className="exercise-input"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Exercise Name"
        required
      />
      <input
        className="exercise-input"
        type="number"
        value={weight}
        onChange={e => setWeight(e.target.value)}
        placeholder="Max Weight (kg)"
        required
      />
      <button className="exercise-button" type="submit">Add to {day}</button>
    </form>
  );
  
}
