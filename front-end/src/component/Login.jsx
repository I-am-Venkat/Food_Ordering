import styles from "../styles/login.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link,useNavigate} from "react-router-dom";
import {useState} from "react";
import Swal from 'sweetalert2';
import axios from "axios";
const Login=()=>{
    const navigate=useNavigate();
    const [formData,setFormData]=useState({
        mobilenumber:"",
        password:""
    })

   const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
   };


    const handleSubmit=async(event)=>{
        event.preventDefault();
        try{
        const response=await axios.post("http://localhost:5000/login",{mobilenumber:formData.mobilenumber,password:formData.password});
        
        if(response.data.success){
            Swal.fire({
                title: "Login Successfull !",
                icon: "success",
                draggable: true,
                confirmButtonText:"Okay"
                    })
                    .then((result=>{
                        if(result.isConfirmed){
                            navigate("/Dashboard/AdminDashboard");
                        }
                    }));
            console.log("Login Successfull");

        }
        else{
            Swal.fire({
                icon: "error",
                title: "Wrong Password !",
                text: "Enter Correct Password",
              });
        }
    }
    catch{
        Swal.fire({
            icon: "error",
            title: "Invalid !",
            text: "Error",
          });
    }
    }
    return (

    <div class={styles.container} style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
  

    <div class={styles.loginContainer}>

        <div id="heading">
            <h2 style={{fontWeight:"800"}}>LOGIN</h2>
        </div>
        
        <form class="login_form" onSubmit={handleSubmit} method="POST">

            <div class="form-group" id="mobile-number">
                <input className="form-control" type="text" name ="mobilenumber" onChange={handleChange} value={formData.mobilenumber} minLength="10" maxLength="10" placeholder="Enter Mobile number" required/>
            </div>

            <div class="form-group" id="password">
                <input class="form-control" type="password" minLength="8" name="password" onChange={handleChange} value={formData.password} placeholder="Enter Password" required/>
            </div>

            <div id="submit-button">
                <button class="btn btn-primary" type="submit" id="submit">Submit</button>
            </div>

        </form>

            <div id="redirect">
                <label for="">Don't have an account <Link to="/">Create Account</Link></label>
            </div>
        
        
    </div>


    </div>)

}
export default Login;