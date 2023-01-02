import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import ExercisesList from './components/exercises-list'
import Exercise from "./components/exercise";
import New from "./components/new";
import History from "./components/history";
import Graph from "./components/graph";
import Login from "./components/login";
import Signup from "./components/signup";
import MainNavbar from "./components/main-navbar";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const{ user } = useAuthContext()

  return (
    <div>
      <MainNavbar />
          
      <Routes>
        <Route path="/"
               element={user
                        ? <ExercisesList />
                        : <Navigate to="/login" />} />
        <Route path="/:id" element={user
                                    ? <Exercise />
                                    : <Navigate to="/login" />}>
          <Route index element={<New />} />
          <Route path="history" element={<History />} />
          <Route path="graph" element={<Graph />} />
        </Route>
        <Route path="/login" element={!user
                                      ? <Login />
                                      : <Navigate to="/" />} />
        <Route path="/signup" element={!user
                                       ? <Signup />
                                       : <Navigate to="/" />} />
      </Routes>
    </div>
    
  );
};

export default App;
