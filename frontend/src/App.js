import React from "react"
import { Routes, Route, Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import ExercisesList from './components/exercises-list'
import Exercise from "./components/exercise";
import New from "./components/new";

// Temporary page

const Login = () => {
  return <h2>login</h2>;
};

const History = () => {
  return <h1>history</h1>
}
const Graph = () => {
  return <h1>graph</h1>
}

const App = () => {
  return (
    <div>
      <nav className="navbar navbar-expand">
        <div className="container">
          <Link to='/' className = "navbar-brand"> tsuyo </Link>

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
        <Route path="/:id" element={<Exercise />}>
      {/* note to self: use contexts to send exercise data to the components */}
          <Route index element={<New />} />
          <Route path="history" element={<History />} />
          <Route path="graph" element={<Graph />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
    
  );
};

export default App;
