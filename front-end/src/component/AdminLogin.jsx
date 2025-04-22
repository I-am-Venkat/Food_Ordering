import styles from "../styles/login.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from 'sweetalert2';
import axios from "axios";
import { backdropClasses } from "@mui/material";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.username || !formData.password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all the fields",
      });
      return;
    }

    try {
      if (formData.username == 'venkat' && formData.password == 'atvenkat@123') {
        Swal.fire({
          title: "Admin Login Successful!",
          icon: "success",
          confirmButtonText: "Okay"
        });
        navigate("/Dashboard/AdminDashboard");
        console.log("Admin Login Successful");
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid Login",
          text: "Username or password is incorrect",
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
    <div className={styles.container} style={{
      backgroundColor: "#f4f6f8",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      padding: "20px",
      position: "relative"
    }}>

      {/* Top Right Button */}
      <button
        onClick={() => navigate('/login')}
        className="btn"
        style={{
            backgroundColor:"white",
            color:"black",
          position: "absolute",
          top: "20px",
          right: "20px",
          borderRadius: "10px",
          fontWeight: "bold",
          padding: "10px 20px",
          zIndex: 1000,
          
        }}
      >
        👤 Login as User
      </button>

      <div className="container">
        <div className="row justify-content-center align-items-center">

          <div className="col-md-6 text-center mb-4">
            <h1 style={{
              color: "#2c3e50",
              fontSize: "36px",
              fontWeight: "700",
              fontFamily: "Segoe UI, sans-serif",
              textAlign: "left"
              
            }}>
              Admin Panel Access
            </h1>
            <p style={{
              color: "#34495e",
              fontSize: "16px",
              textAlign: "left"
            }}>
              Login to manage the backend and operations 🛠️
            </p>
          </div>

          <div className="col-md-6">
            <div className="card shadow p-4" style={{
              borderRadius: "12px",
              backgroundColor: "#ffffff",
              border: "1px solid #dfe6e9"
            }}>
              <form onSubmit={handleSubmit}>
                <h3 className="text-center mb-4" style={{
                  color: "#2980b9",
                  fontWeight: "bold"
                }}>
                  Admin Login
                </h3>

                <div className="mb-3">
                  <input
                    className="form-control"
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={formData.username}
                    placeholder="👤 Username"
                    required
                    style={{ borderRadius: "10px" }}
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
                    style={{ borderRadius: "10px" }}
                  />
                </div>

                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-lg" style={{
                    backgroundColor: "#2c3e50",
                    color: "#fff",
                    borderRadius: "10px",
                    fontWeight: "bold"
                  }}>
                    🛠️ Admin Login
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
