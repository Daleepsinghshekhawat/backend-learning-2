import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check new password and confirm password
    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      return alert(
        "New Password and Confirm Password must match"
      );
    }

    try {
      const response = await axios.patch(
        "http://localhost:3000/api/users/resetpassword",
        {
          email: formData.email,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }
      );

      alert(response.data.message);

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>

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
          <label>Old Password</label>
          <br />
          <input
            type="password"
            name="oldPassword"
            placeholder="Enter Old Password"
            value={formData.oldPassword}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>New Password</label>
          <br />
          <input
            type="password"
            name="newPassword"
            placeholder="Enter New Password"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>Confirm Password</label>
          <br />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <br />

        <button type="submit">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;