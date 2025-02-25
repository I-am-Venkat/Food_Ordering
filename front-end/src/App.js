import logo from './logo.svg';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
import Register from './component/Register';
import Login from './component/Login';
import Home from './component/Home';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/Login" element={<Login/>}/>
        <Route path="/" element={<Register/>}/>
        <Route path="/Home" element={<Home/>}/>
        
      </Routes>
    </Router>
  );
}
export default App;

