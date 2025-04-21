import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import ExerciseForm from "../components/ExerciseForm";
import ExerciseItem from "../components/ExerciseItem";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './../styles/Dashboard.css';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Dashboard() {
  const navigate = useNavigate();
  const [weeklyExercises, setWeeklyExercises] = useState({});
  const user = auth.currentUser;
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/")
    
  };
  useEffect(() => {
    if (!user) return;

    const unsubscribes = daysOfWeek.map(day => {
      const colRef = collection(db, `users/${user.uid}/days/${day}/exercises`);
      return onSnapshot(colRef, snapshot => {
        setWeeklyExercises(prev => ({
          ...prev,
          [day]: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        }));
      });
    });

    return () => unsubscribes.forEach(unsub => unsub());
  }, [user]);

  return (
    <div className="dashboard-container">
       <button onClick={handleLogout} className="logout-button">
  Logout
</button>

      {daysOfWeek.map(day => (
        <div className="day-section" key={day}>
         <h1 style={{ textAlign: 'center' }}>{day}</h1>

          <ExerciseForm userId={user?.uid} day={day} />
          {(weeklyExercises[day] || []).map(ex => (
            <ExerciseItem key={ex.id} exercise={ex} userId={user.uid} day={day} />
          ))}
        </div>
      ))}
    </div>
  );
}
