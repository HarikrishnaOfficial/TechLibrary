import './App.css';
import AddStoryForm from './Components/AddStoryForm';
import StoriesList from './Components/StoriesList';
import StoriesListPaginated from './Components/StoriesListPaginated';
import AboutUs from './Components/AboutUs';
import React, { useEffect } from 'react';
import ContactUs from './Components/ContactUs';
import LandingPage from './mainfolder_MUI/pages/LandingPage';
import ScopedSearch from './Components/ScopedSearch';
import CheckFilter from './Components/CheckFilter';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { useState } from 'react';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  const [mode, setMode] = useState("light");
  const [loggedStatus, setLoggedStatus] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem('loggedStatus') === 'true';
    setLoggedStatus(status);
  }, [loggedStatus]);

  const darkTheme = createTheme({
    palette: {
      mode: mode
    }
  });

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={loggedStatus ? <StoriesList /> : <Navigate to="/" />} />
          <Route path="/addStory" element={loggedStatus ? <AddStoryForm /> : <Navigate to="/" />} />
          <Route path="/aboutUs" element={loggedStatus ? <AboutUs /> : <Navigate to="/" />} />
          <Route path="/contactUs" element={loggedStatus ? <ContactUs /> : <Navigate to="/" />} />
          <Route path="/pagination" element={loggedStatus ? <StoriesListPaginated /> : <Navigate to="/" />} />
          <Route path="/scopedSearch" element={loggedStatus ? <ScopedSearch /> : <Navigate to="/" />} />
          <Route path="/checkFilter" element={loggedStatus ? <CheckFilter /> : <Navigate to="/" />} />
          <Route 
            path="/materialUI" 
            element={
              loggedStatus ? (
                <ThemeProvider theme={darkTheme}>
                  <Box bgcolor={"background.default"}>
                    <LandingPage mode={mode} setMode={setMode} />
                  </Box>
                </ThemeProvider>
              ) : (
                <Navigate to="/" />
              )
            } 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
