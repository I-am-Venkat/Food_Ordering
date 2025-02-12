import logo from './logo.svg';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

// import './App.css';
import Register from './component/Register';
import Login from './component/Login';
function App() {
  return (
    // <div className="App">
    //   <Register/>
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/Login" element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;

