import styles from "../styles/register.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from 'sweetalert2';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    password: "",
    confirmPassword: ""
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Password and confirm password should be same",
      });
    } else {
      fetch("http://localhost:5000/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          mobilenumber: formData.mobileNumber,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        })
      }).then((res) => res.json())
        .then((data) => {
          if (data.success==false || data.error) {
            Swal.fire({
              icon: "error",
              title: "Error Occurred",
              text: data?.message || "Something went wrong.",
            });
          } else {
            Swal.fire({
              title: "Registered Successfully!",
              icon: "success",
              confirmButtonText: "Okay",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/Login");
              }
            });
          }
        });
    }
  }

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: "#fff8f0",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <div className="container">
        <div className="row justify-content-center align-items-center">

          <div className="col-md-6 text-center mb-4" >
            <h1 className="animate__backInLeft" style={{ color: "#e74c3c", fontSize: "40px",fontWeight: "700", fontFamily: "cursive", textAlign:"left"}}>
              Join & Satisfy Your Cravings!
            </h1>
            <p  style={{ color: "#7f8c8d", fontSize: "18px" ,textAlign:"left"}}>
              Sign up and get your favorite food delivered in minutes 🍔🍕
            </p>
          </div>

          <div className="col-md-6">
            <div className="card shadow p-4" style={{ borderRadius: "20px", backgroundColor: "#fffdf9", border: "2px solid #ffe6d5" }}>
              <form onSubmit={handleSubmit}>
                <h3 className="text-center mb-4" style={{ color: "#e67e22", fontWeight: "bold" }}>Create Account</h3>

                <div className="mb-3">
                  <input className="form-control" type="text" placeholder="👤 Your Name"
                    name="name" value={formData.name} onChange={handleChange}
                    minLength="3" required style={{ borderRadius: "12px" }} />
                </div>

                <div className="mb-3">
                  <input className="form-control" type="tel" placeholder="📞 Mobile Number"
                    name="mobileNumber" value={formData.mobileNumber} onChange={handleChange}
                    minLength="10" maxLength="10" pattern="[0-9]{10}" required style={{ borderRadius: "12px" }} />
                </div>

                <div className="mb-3">
                  <input className="form-control" type="password" placeholder="🔒 Password"
                    name="password" value={formData.password} onChange={handleChange}
                    minLength="8" required style={{ borderRadius: "12px" }} />
                </div>

                <div className="mb-4">
                  <input className="form-control" type="password" placeholder="🔒 Confirm Password"
                    name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                    minLength="8" required style={{ borderRadius: "12px" }} />
                </div>

                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-lg" style={{
                    backgroundColor: "#e74c3c",
                    color: "#fff",
                    borderRadius: "12px",
                    fontWeight: "bold"
                  }}>
                    🍽️ Register & Order
                  </button>
                </div>

                <div className="text-center">
                  <label style={{ color: "#7f8c8d" }}>
                    Already have an account?{" "}
                    <Link to="/Login" style={{ color: "#e67e22", fontWeight: "500" }}>
                      Login here
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

export default Register;
