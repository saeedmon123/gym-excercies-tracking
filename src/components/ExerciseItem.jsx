import { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import './../styles/ExerciseItem.css';
export default function ExerciseItem({ exercise, userId, day }) {
  const [editing, setEditing] = useState(false);
  const [weight, setWeight] = useState(exercise.maxWeight);

  const handleUpdate = async () => {
    await updateDoc(doc(db, `users/${userId}/days/${day}/exercises/${exercise.id}`), {
      maxWeight: Number(weight)
    });
    setEditing(false);
  };

  const handleDelete = async () => {
    await deleteDoc(doc(db, `users/${userId}/days/${day}/exercises/${exercise.id}`));
  };

  return (
    <div className="exercise-item">
      <h4 className="exercise-name">{exercise.name}</h4>
      {editing ? (
        <>
          <input
            className="exercise-input"
            type="number"
            value={weight}
            onChange={e => setWeight(e.target.value)}
          />
          <button className="exercise-button" onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <p className="exercise-weight">Max Weight: {exercise.maxWeight} kg</p>
      )}
      <div className="exercise-actions">
        <button className="exercise-button" onClick={() => setEditing(!editing)}>
          {editing ? "Cancel" : "Edit"}
        </button>
        <button className="exercise-delete" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
  
}
