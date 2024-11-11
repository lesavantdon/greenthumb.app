import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Navbar from './components/NavBar';
import {HomePage} from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import PlantDetailPage from './pages/PlantDetailPage';
import { AuthProvider } from './AuthContext';
import GreenhousePage from './pages/GreenHousePage';



function App() {
  return (
   
    <Router>
      <div className="App">
        <AuthProvider>
        <Navbar />
        <Routes> 
          <Route path="/" element={<HomePage />} /> 
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/search" element={<SearchPage/>} />
          <Route path="/plants/:id" element={<PlantDetailPage />} />
          <Route path="/greenhouse" element={<GreenhousePage/>} />

        </Routes>
      </AuthProvider>
      </div>
    </Router>
  );
}


export default App;