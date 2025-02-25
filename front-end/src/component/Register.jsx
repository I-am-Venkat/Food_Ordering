// import bgimg from '../img/loginBGI.jpg'
import styles from "../styles/register.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import {useState} from "react";
import Swal from 'sweetalert2';
// import Popup from "./Popup";
const Register = () => {
     const navigate=useNavigate(); // For navigation
     const [formData,setFormData]=useState({
      name:"",
      mobileNumber:"",
      password:"",
      confirmPassword:""
     })
     const [showModal,setShowModal]=useState(false);
     
     const handleChange=(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value})
     };

     const handleSubmit=(event)=>{
          event.preventDefault();
          if(formData.password!==formData.confirmPassword){
            Swal.fire({
              icon: "error",
              title: "Password Mismatch",
              text: "Pasword and confirm password should be same",
              // footer: '<a href="#">Why do I have this issue?</a>'
            });
            // setShowModal(true);
            // return;
          }
          else{
              console.log("registered Successfully");
              navigate("/Login");
          }
          
     }
     
     

  return (
    <div className={styles.container}>

      <div className="row">

        <div className="col-sm" id="heading" style={{ display: "flex" }}>
          <h1>Register and Place Your First Order</h1>
        </div>

        <div className="col-sm" style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
          <div className={styles.registerContainer} >
            <form onSubmit={handleSubmit} >
              <div className="form-group" id="reg" style={{ alignItems: "center" }}>
                <h2 style={{ marginBottom: "20px" }}>Register</h2>
              </div>

              <div className="form-group" id="name">
                <input className="form-control" type="text" placeholder="Enter Your name" name="name" value={formData.name} onChange={handleChange} minLength="3"
                  required />
              </div>

              <div className="form-group" id="mobile-number">
                <input className="form-control" type="tel" minLength="10" maxLength="10" pattern="[0-9]{10}" placeholder="Enter Mobile number"
                  name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <input className="form-control" type="password" id="password" placeholder="Enter Password" name="password" value={formData.password} onChange={handleChange}
                  minLength="8" required />
              </div>

              <div className="form-group">
                <input className="form-control" id="confirm-password" type="password" placeholder="Confirm Password"
                  name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} minLength="8" required />
              </div>

              <div id="button">
                <button type="submit" id="submit" className="btn btn-primary btn-md btn-sm btn-lg">
                  Submit
                </button>
              </div>
            </form>
            {/* {showModal && (
            <div className="modal show" style={{display:"block"}} tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Password Mismatch
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setShowModal(false)}></button>
                  </div>

                  <div className="modal-body">
                    The passwords do not match. Please try again.
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>setShowModal(false)} >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )} */}
           {/* <Popup show={showModal} onClose={() => setShowModal(false)} title="Password Mismatch" message="The passwords do not match. Please try again." /> */}
            <div id="redirect">
              <label htmlFor="">Already have an account
                <Link to="/Login">L o g i n</Link></label>
            </div>
          </div>
        </div>

      </div>

    </div>)
}
export default Register;