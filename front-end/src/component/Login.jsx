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
            navigate("/Home");
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
    <div className={styles.container} style={{ backgroundColor: "#fff8f0", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "20px" }}>
      <div className="container">
        <div className="row justify-content-center align-items-center">

          <div className="col-md-6 text-center mb-4">
            <h1 style={{ color: "#e74c3c", fontSize: "40px", fontWeight: "700", fontFamily: "cursive", textAlign: "left" }}>
              Welcome Back, Cravings Await!
            </h1>
            <p style={{ color: "#7f8c8d", fontSize: "18px", textAlign: "left" }}>
              Log in and get your favorite food delivered in minutes 🍔🍕
            </p>
          </div>

          <div className="col-md-6">
            <div className="card shadow p-4" style={{ borderRadius: "20px", backgroundColor: "#fffdf9", border: "2px solid #ffe6d5" }}>
              <form onSubmit={handleSubmit}>
                <h3 className="text-center mb-4" style={{ color: "#e67e22", fontWeight: "bold" }}>Login</h3>

                <div className="mb-3">
                  <input
                    className="form-control"
                    type="text"
                    name="mobilenumber"
                    onChange={handleChange}
                    value={formData.mobilenumber}
                    minLength="10"
                    maxLength="10"
                    placeholder="📞 Mobile Number"
                    required
                    style={{ borderRadius: "12px" }}
                  />
                </div>

                <div className="mb-3">
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    minLength="8"
                    placeholder="🔒 Password"
                    required
                    style={{ borderRadius: "12px" }}
                  />
                </div>

                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-lg" style={{
                    backgroundColor: "#e74c3c",
                    color: "#fff",
                    borderRadius: "12px",
                    fontWeight: "bold"
                  }}>
                    🍽️ Login
                  </button>
                </div>

                <div className="text-center">
                  <label style={{ color: "#7f8c8d" }}>
                    Don't have an account?{" "}
                    <Link to="/" style={{ color: "#e67e22", fontWeight: "500" }}>
                      Create Account
                    </Link>
                  </label>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
