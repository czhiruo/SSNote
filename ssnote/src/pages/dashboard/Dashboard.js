import Sidebar from "./SideBar";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { db, auth } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import WithAuthCheck from "../WithAuthCheck";

const Dashboard = () => {
  const [userNotes, setUserNotes] = useState([]);
  const navigate = useNavigate();
  const user = auth.currentUser;

  const fetchUserNotes = async () => {
    try {
      const userId = user.uid;
      const userNotesRef = collection(db, "users", userId, "notes");
      const notesSnapshot = await getDocs(userNotesRef);
      const notesData = notesSnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        coverImage: doc.data().coverImage
      }));
      //notesData is an array of notes with the id & title of each note
      console.log("fetching notes data:", notesData);
      setUserNotes(notesData);
    } catch (error) {
      console.error("Error fetching user notes: ", error);
    }
  };

  return (
    <div>
      <Sidebar navigate={navigate} userNotes={userNotes} />
      <Home
        navigate={navigate}
        fetchUserNotes={fetchUserNotes}
        userNotes={userNotes}
      />
    </div>
  );
};

export default WithAuthCheck(Dashboard);
