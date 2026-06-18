import axios from "axios";
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(loginData);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/login",
        loginData,
      );
       console.log(res.data);
      // Store token
      localStorage.setItem("token", res.data.token);
      alert(res.data.message);
      
       navigate("/");
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div>
      <h2>Login Page</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={loginData.email}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={loginData.password}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Login</button>
        <p>
          <Link to="/forgotpassword">Forgot Password?</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
