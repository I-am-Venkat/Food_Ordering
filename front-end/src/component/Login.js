import "../styles/login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link,useNavigate} from "react-router-dom";
const Login=()=>{
    const navigate=useNavigate();
    const [formData,setFormData]=useSate({
        mobilenumber:"",
        password:""
    })

    const handleChange=()=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    };

    const handleSubmit=()=>{
        
    }
    return (

    <div class="container" style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
  

    <div class="login-container">

        <div id="heading">
            <h2 style={{fontWeight:"800"}}>LOGIN</h2>
        </div>
        
        <form class="login_form" action="login.php" method="POST">

            <div class="form-group" id="mobile-number">
                <input className="form-control" type="text" name ="mobilenumber" value="formData.mobilenumber" minLength="10" maxLength="10" placeholder="Enter Mobile number" required/>
            </div>

            <div class="form-group" id="password">
                <input class="form-control" type="password" minLength="8" name="password" value="formData.password" placeholder="Enter Password" required/>
            </div>

            <div id="submit-button">
                <button class="btn btn-primary" type="submit" id="submit"><Link to='/Home'>Submit</Link></button>
            </div>

        </form>

            <div id="redirect">
                <label for="">Don't have an account <Link to="/">Create Account</Link></label>
            </div>
        
        
    </div>


    </div>)

}
export default Login;