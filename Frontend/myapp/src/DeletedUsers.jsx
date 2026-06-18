import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeletedUsers = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  async function getDeletedUser() {
    try {
      const res = await axios.get(`http://localhost:3000/api/users/${id}`);

      setUser(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function restoreUser() {
    try {
      await axios.patch(`http://localhost:3000/api/users/restore/${id}`);

      alert("User Restored");
      navigate("/users");
    } catch (error) {
      console.log(error.message);
    }
  }

  const deleteuser = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/users/delete/${id}`);

      alert("User Deleted Permanently");
      navigate("/users");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDeletedUser();
  }, []);

  return (
    <div>
      <h1>Deleted User</h1>

      <h2>
        {user.name} {user.lastname}
      </h2>

      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Status: {user.status}</p>

      <button onClick={restoreUser}>Restore User</button>

      <button onClick={deleteuser}>Delete Permanently</button>
    </div>
  );
};

export default DeletedUsers;
