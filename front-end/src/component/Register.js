// import bgimg from '../img/loginBGI.jpg'
import "../styles/register.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link,useNavigate} from "react-router-dom";
const Register=()=>{
  const navigate=useNavigate();
  const handleSubmit=(event)=>{
    event.preventDefault();
    console.log("Registered Successfully");
  
    navigate("/Login");
  }

    return(
    <div className="container">
    
<div className="row">

  <div className="col-sm" id="heading" style={{display:"flex"}}>
    <h1>Register and Place Your First Order</h1>
  </div>

  <div className="col-sm" style={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
    <div className="register-container" >
      <form onsubmit="comparePasswords(event)" action="index.php" method="POST">
        <div className="form-group" id="reg" style={{alignItems: "center"}}>
          <h2 style={{marginBottom: "20px"}}>Register</h2>
        </div>

        <div className="form-group" id="name">
          <input className="form-control" type="text" placeholder="Enter Your name" name="name" minlength="3"
            required />
        </div>

        <div className="form-group" id="mobile-number">
          <input className="form-control" type="text" minlength="10" maxlength="10" placeholder="Enter Mobile number"
            name="mobile-number" required />
        </div>

        <div className="form-group">
          <input className="form-control" type="password" id="password" placeholder="Enter Password" name="password"
            minlength="8" required />
        </div>

        <div className="form-group">
          <input className="form-control" id="confirm-password" type="password" placeholder="Confirm Password"
            name="confirm-password" minlength="8" required />
        </div>

        <div id="button">
          <button type="submit" id="submit" className="btn btn-primary btn-md btn-sm btn-lg">
            Submit
          </button>
        </div>
      </form>
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Password Mismatch
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
              The passwords do not match. Please try again.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="redirect">
        <label for="">Already have an account
         <Link to="/Login">L o g i n</Link></label>
      </div>
    </div>
  </div>

</div>

</div>)
}
export default Register;