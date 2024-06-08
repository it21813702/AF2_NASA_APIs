
//import necessary modules, componentd and css
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/Home/HomePage.js';
import NasaArchPage from './components/NasaArch/NasaArchPage.js';
import MarsRovPage from './components/MarsRov/MarsRovPage.js';


//main component of application
function App() {
  return (

    //wrapped entire app with Router for routing functionality
    <div>
      <Router>
        <Routes> {/* Defining the routes for different pages */}

          <Route
            exact
            path='/'
            element={<HomePage/>}
          
          />
        
          <Route
            path='/nasa-archive'
            element={<NasaArchPage/>}
          
          />

          <Route
            path='/mars-rov'
            element={<MarsRovPage/>}
          
          />

          {/*default route if no matching route is found*/ }
          <Route 
            path="*"
            element={<Navigate to="/" />}
            
          />
          
        </Routes>
      </Router>
    </div>

  );
}

export default App;