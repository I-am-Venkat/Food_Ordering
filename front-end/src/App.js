import logo from './logo.svg';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

// import './App.css';
import Register from './component/Register';
import Login from './component/Login';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/Login" element={<Login/>}/>
        <Route path="/" element={<Register/>}/>
        
      </Routes>
    </Router>
  );
}
export default App;

