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

/**
 * The main app component. 
 */
const App = () => {
  const{ user } = useAuthContext()

  return (
    <div className="d-flex flex-column min-vh-100">
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

      <footer className="py-3 mt-auto bg-dark">
        <div className="container px-4">
          <p className="m-0 text-center text-white">
            &copy; Copyright 2023. Website by&nbsp;
            <a className="text-decoration-none text-light font-weight-bold"
               href="https://github.com/wrewsama">
              wrewsama
            </a>
          </p>
        </div>
      </footer>
    </div>
    
  );
};

export default App;
