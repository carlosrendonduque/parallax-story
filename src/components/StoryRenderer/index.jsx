// src/components/StoryRenderer/index.jsx
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStory } from '../../context/StoryContext';
import { useLocation } from '../../context/LocationContext';
import { useDevice } from '../../context/DeviceContext';
import CameraView from '../CameraView';
import StoryText from '../StoryText';
import NavigationControls from '../NavigationControls';
import ContextualInfo from '../ContextualInfo';
import {
  RendererContainer,
  StoryOverlay,
  StoryContent,
  ContentWrapper
} from './StoryRenderer.styles';

const StoryRenderer = () => {
  const { 
    getCurrentPage, 
    currentPage, 
    totalPages, 
    nextPage, 
    previousPage,
    isFirstPage,
    isLastPage
  } = useStory();
  
  const { 
    getLocationData,
    currentTime,
    parallelTime,
    weather
  } = useLocation();
  
  const { orientation, getTiltTransform } = useDevice();
  const containerRef = useRef(null);

  const currentStoryData = getCurrentPage();
  const locationData = getLocationData();

  // Apply tilt effect based on device orientation
  useEffect(() => {
    if (containerRef.current) {
      const transform = getTiltTransform();
      containerRef.current.style.transform = transform;
    }
  }, [orientation, getTiltTransform]);

  // Handle touch gestures for navigation
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    
    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    };
    
    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleGesture();
    };
    
    const handleGesture = () => {
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const minSwipeDistance = 50;
      
      // Only handle horizontal swipes that are more horizontal than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0 && !isFirstPage()) {
          // Swipe right - go to previous page
          previousPage();
        } else if (deltaX < 0 && !isLastPage()) {
          // Swipe left - go to next page
          nextPage();
        }
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
      
      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [nextPage, previousPage, isFirstPage, isLastPage]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'ArrowRight':
        case ' ': // Spacebar
          event.preventDefault();
          if (!isLastPage()) {
            nextPage();
          }
          break;
        case 'ArrowLeft':
          event.preventDefault();
          if (!isFirstPage()) {
            previousPage();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextPage, previousPage, isFirstPage, isLastPage]);

  // Animation variants
  const overlayVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  if (!currentStoryData) {
    return (
      <RendererContainer>
        <StoryOverlay>
          <StoryContent>
            <div style={{ color: 'white', textAlign: 'center' }}>
              Error: No se pudo cargar la página de la historia.
            </div>
          </StoryContent>
        </StoryOverlay>
      </RendererContainer>
    );
  }

  return (
    <RendererContainer ref={containerRef}>
      {/* Camera background - HIDDEN for now */}
      <div style={{ display: 'none' }}>
        <CameraView />
      </div>
      
      {/* DEBUG: Context info for development */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        zIndex: 1000,
        fontSize: '11px',
        maxWidth: '200px'
      }}>
        <strong>DEBUG: Story Context</strong><br/>
        Page: {currentPage + 1}/{totalPages}<br/>
        Story ID: {currentStoryData.id}<br/>
        <hr style={{margin: '5px 0', opacity: 0.3}}/>
        📍 Location: {locationData?.address || 'Loading...'}<br/>
        🕐 Time: {currentTime || 'Loading...'}<br/>
        🌤️ Weather: {weather?.current || 'Loading...'}<br/>
        <hr style={{margin: '5px 0', opacity: 0.3}}/>
        🌀 Parallel Time: {parallelTime || 'N/A'}<br/>
        ✨ Parallel Weather: {weather?.parallel || 'N/A'}
      </div>
      
      {/* Story overlay with content */}
      <AnimatePresence mode="wait">
        <StoryOverlay
          key={currentPage}
          as={motion.div}
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Main story content */}
          <StoryContent>
            <ContentWrapper
              as={motion.div}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <StoryText 
                text={currentStoryData.text}
                locationData={locationData}
                pageId={currentStoryData.id}
              />
            </ContentWrapper>
          </StoryContent>
          
          {/* Navigation controls */}
          <NavigationControls 
            currentPage={currentPage}
            totalPages={totalPages}
            onNext={nextPage}
            onPrevious={previousPage}
            isFirstPage={isFirstPage()}
            isLastPage={isLastPage()}
          />
        </StoryOverlay>
      </AnimatePresence>
    </RendererContainer>
  );
};

export default StoryRenderer;