import React from "react"
import { Routes, Route, Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import ExercisesList from './components/exercises-list'
import Exercise from "./components/exercise";
import New from "./components/new";
import History from "./components/history";
import Graph from "./components/graph";
import Login from "./components/login";
import Signup from "./components/signup";
import { useLogout } from "./hooks/useLogout";

const App = () => {
  const { logout } = useLogout()

  const handleLogout = () => {
    logout()
  }

  return (
    <div>
      <nav className="navbar navbar-expand">
        <div className="container">
          <Link to='/' className = "navbar-brand"> tsuyo </Link>

          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="btn"
                      onClick={handleLogout}>
                Log out
              </button>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Log in</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </li>
          </ul>
        </div>
      </nav>
          
      <Routes>
        <Route path="/" element={<ExercisesList />} />
        <Route path="/:id" element={<Exercise />}>
          <Route index element={<New />} />
          <Route path="history" element={<History />} />
          <Route path="graph" element={<Graph />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
    
  );
};

export default App;
