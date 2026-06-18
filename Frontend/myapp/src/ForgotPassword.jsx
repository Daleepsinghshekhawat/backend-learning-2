import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const ForgotPassword = () => {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        "http://localhost:3000/api/users/forgotpassword",
        formData,
      );

      alert(response.data.message);

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>New Password</label>
          <br />
          <input
            type="password"
            name="password"
            placeholder="Enter New Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <br />

        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
