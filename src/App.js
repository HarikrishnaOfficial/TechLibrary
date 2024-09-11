import './App.css';
import AddStoryForm from './Components/AddStoryForm';
import StoriesList from './Components/StoriesList';
import StoriesListPaginated from './Components/StoriesListPaginated';
import AboutUs from './Components/AboutUs';
import React from 'react';
import Navbar from './Components/Navbar';
import ContactUs from './Components/ContactUs';
import LandingPage from './mainfolder_MUI/pages/LandingPage';
import ScopedSearch from './Components/ScopedSearch';
import CheckFilter from './Components/CheckFilter';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { useState } from 'react';

function App() {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode
    }
  });

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<StoriesList />} />
          <Route path="/addStory" element={<AddStoryForm />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/pagination" element={<StoriesListPaginated />} />
          <Route path="/scopedSearch" element={<ScopedSearch />} />
          <Route path="/checkFilter" element={<CheckFilter />} />
          <Route 
            path="/materialUI" 
            element={
              <ThemeProvider theme={darkTheme}>
                <Box bgcolor={"background.default"}>
                  <LandingPage mode={mode} setMode={setMode} />
                </Box>
              </ThemeProvider>
            } 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
