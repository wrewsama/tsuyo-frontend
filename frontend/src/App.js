import React from "react"
import { Routes, Route, Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import ExercisesList from './components/exercises-list'

// Pages ----------------------

const Login = () => {
  return <h2>login</h2>;
};

// Routing --------------------

const App = () => {
  return (
    <div>
      <nav className="navbar navbar-expand">
        <div className="container">
          <Link to='/'  className = "navbar-brand"> tsuyo </Link>

          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Exercises</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
          
      <Routes>
        <Route path="/" element={<ExercisesList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
    
  );
};

export default App;
