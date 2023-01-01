import React from "react"
import { Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import ExercisesList from './components/exercises-list'
import Exercise from "./components/exercise";
import New from "./components/new";
import History from "./components/history";
import Graph from "./components/graph";
import Login from "./components/login";
import Signup from "./components/signup";
import MainNavbar from "./components/main-navbar";

const App = () => {
  return (
    <div>
      <MainNavbar />
          
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
