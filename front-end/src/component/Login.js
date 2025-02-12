import "../styles/login.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link,useNavigate} from "react-router-dom";
const Login=()=>{
    return (

    <div class="container" style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
  

    <div class="login-container">

        <div id="heading">
            <h1>LOGIN</h1>
        </div>
        
        <form class="login_form" action="login.php" method="POST">

            <div class="form-group" id="mobile-number">
                <input class="form-control" type="text" minlength="10" maxlength="10" placeholder="Enter Mobile number" required/>
            </div>

            <div class="form-group" id="password">
                <input class="form-control" type="password" minlength="8" placeholder="Enter Password" required/>
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