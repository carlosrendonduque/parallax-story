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
  
  // Different navigation modes
  const isStoryPage = location.pathname === '/story';
  const isPermissionsPage = location.pathname === '/permissions';
  
  return (
    <LayoutContainer $isStoryMode={isStoryPage}>
      {/* Show different navigation based on page */}
      {!isPermissionsPage && (
        <Navigation storyMode={isStoryPage} />
      )}
      
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