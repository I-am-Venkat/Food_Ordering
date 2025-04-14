import styles from "../styles/login.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from 'sweetalert2';
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mobilenumber: "",
    password: ""
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.mobilenumber || !formData.password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all the fields",
      });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        mobilenumber: formData.mobilenumber,
        password: formData.password,
      });

      if (response.data.success) {
        Swal.fire({
          title: "Login Successful!",
          icon: "success",
          confirmButtonText: "Okay"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/Dashboard/AdminDashboard");
          }
        });

        console.log("Login Successful");
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid Login",
          text: response.data.message || "Mobile number or password is incorrect",
        });
      }

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong. Please try again later.",
      });
    }
  };

  

  return (
    <div className={styles.container} style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div className={styles.loginContainer}>
        <div id="heading">
          <h2 style={{ fontWeight: "800" }}>LOGIN</h2>
        </div>

        <form className="login_form" onSubmit={handleSubmit} method="POST">
          <div className="form-group" id="mobile-number">
            <input
              className="form-control"
              type="text"
              name="mobilenumber"
              onChange={handleChange}
              value={formData.mobilenumber}
              minLength="10"
              maxLength="10"
              placeholder="Enter Mobile Number"
              required
            />
          </div>

          <div className="form-group" id="password">
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              minLength="8"
              placeholder="Enter Password"
              required
            />
          </div>

          <div id="submit-button">
            <button className="btn btn-primary" type="submit" id="submit">Submit</button>
          </div>
        </form>

        <div id="redirect">
          <label>
            Don't have an account? <Link to="/">Create Account</Link>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Login;
