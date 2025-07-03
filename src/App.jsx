// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoryProvider } from './context/StoryContext';
import { LocationProvider } from './context/LocationContext';
import { DeviceProvider } from './context/DeviceContext';
import IntroPage from './pages/IntroPage';
import PermissionsPage from './pages/PermissionsPage';
import StoryPage from './pages/StoryPage';
import AboutPage from './pages/AboutPage';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <StoryProvider>
        <LocationProvider>
          <DeviceProvider>
            <div className="App">
              <Layout>
                <Routes>
                  <Route path="/" element={<IntroPage />} />
                  <Route path="/permissions" element={<PermissionsPage />} />
                  <Route path="/story" element={<StoryPage />} />
                  <Route path="/about" element={<AboutPage />} />
                </Routes>
              </Layout>
            </div>
          </DeviceProvider>
        </LocationProvider>
      </StoryProvider>
    </Router>
  );
}

export default App;