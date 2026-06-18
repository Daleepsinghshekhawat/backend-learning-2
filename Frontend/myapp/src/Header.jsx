import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Header = () => {
   const navigate = useNavigate();

   const handleLogout = () => {
     localStorage.removeItem("user");
     localStorage.removeItem("token");

     navigate("/signup");
   };
  return (
    <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
      <Link to="/">form </Link>
      <Link to="/users">Users </Link>
      <Link to="/usersinfo">Userinfo </Link>
      <Link to="/updateusers">updateusers </Link>
      <Link to="/deletedusers">deletedusers </Link>
      <Link to="/login">Login </Link>
      <Link to="/signup">Signup </Link>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate("/resetpassword")}>
        Reset Password
      </button>
    </div>
  );
};
export default Header;
