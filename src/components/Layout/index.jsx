// src/components/Layout/index.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation';
import { 
  LayoutContainer, 
  MainContent, 
  StoryOverlay 
} from './Layout.styles';

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Hide navigation on story page for immersive experience
  const isStoryPage = location.pathname === '/story';
  const isPermissionsPage = location.pathname === '/permissions';
  
  return (
    <LayoutContainer $isStoryMode={isStoryPage}>
      {/* Show navigation only on non-story pages */}
      {!isStoryPage && !isPermissionsPage && <Navigation />}
      
      {/* Main content area */}
      <MainContent $isStoryMode={isStoryPage}>
        {children}
      </MainContent>
      
      {/* Background overlay for story mode */}
      {isStoryPage && <StoryOverlay />}
    </LayoutContainer>
  );
};

export default Layout;