import axios from "axios";
import { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    gender: "",
    age: "",
    course: "",
    address: "",
    pincode: "",
    company: "",
    salary: "",
    skill: "",
    experience: "",
    password: "",
    dob: "",
    role: "",
    department: "",
    joiningdate: "",
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
      const res = await axios.post("http://localhost:3000/api/users", formData);

      console.log(res.data);

      alert("User Added");

      setFormData({
        name: "",
        lastname: "",
        email: "",
        phone: "",
        city: "",
        country: "",
        gender: "",
        age: "",
        course: "",
        address: "",
        pincode: "",
        company: "",
        salary: "",
        skill: "",
        experience: "",
        password: "",
        dob: "",
        role: "",
        department: "",
        joiningdate: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          name="name"
          placeholder="name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="lastname"
          placeholder="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />
        <br />
        <input
          type="number"
          name="age"
          min="1"
          max="100"
          placeholder="age"
          value={formData.age}
          onChange={handleChange}
        />
        <br />

        <input
          type="email"
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="phone"
          maxLength={10}
          placeholder="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="city"
          placeholder="city"
          value={formData.city}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="country"
          placeholder="country"
          value={formData.country}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="gender"
          placeholder="gender"
          value={formData.gender}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="course"
          placeholder="course"
          value={formData.course}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="address"
          placeholder="address"
          value={formData.address}
          onChange={handleChange}
        />
        <br />
        <input
          type="number"
          name="pincode"
          min ="1"
          placeholder="pincode"
          value={formData.pincode}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="company"
          placeholder="company"
          value={formData.company}
          onChange={handleChange}
        />
        <br />
        <input
          type="number"
          name="salary"
          min="1"
          placeholder="salary"
          value={formData.salary}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="skill"
          placeholder="skill"
          value={formData.skill}
          onChange={handleChange}
        />
        <br />

        <input
          type="text"
          name="experience"
          placeholder="experience"
          value={formData.experience}
          onChange={handleChange}
        />
        <br />

        <input
          type="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <input
          type="date"
          name="dob"
          placeholder="dob"
          value={formData.dob}
          onChange={handleChange}
        />
        <br />

        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Manager">Manager</option>
        </select>
        <br />
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
        >
          <option value="">Select Department</option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="Sales">Sales</option>
        </select>
        <br />
        <input
          type="date"
          name="joiningdate"
          placeholder="joiningdate"
          value={formData.joiningdate}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default Form;
