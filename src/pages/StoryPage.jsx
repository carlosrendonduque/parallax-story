// src/pages/StoryPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useStory } from '../context/StoryContext';
import StoryRenderer from '../components/StoryRenderer';
import {
  StoryContainer,
  LoadingOverlay,
  LoadingSpinner,
  LoadingText,
  ErrorContainer,
  ErrorMessage,
  RetryButton
} from './StoryPage.styles';

const StoryPage = () => {
  const navigate = useNavigate();
  const { getCurrentPage, isLoading, error } = useStory();
  const [isInitializing, setIsInitializing] = useState(true);

  // Simple initialization - no complex permissions
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 2000); // Simple 2 second delay

    return () => clearTimeout(timer);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (event.key) {
        case 'Escape':
          navigate('/');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  // Prevent page refresh/back on mobile
  useEffect(() => {
    document.body.style.overscrollBehavior = 'none';
    
    return () => {
      document.body.style.overscrollBehavior = 'auto';
    };
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate('/');
  };

  // Show loading screen while initializing
  if (isInitializing) {
    return (
      <StoryContainer>
        <LoadingOverlay
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LoadingSpinner
            as={motion.div}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <LoadingText
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Preparando tu dimensión paralela...
          </LoadingText>
        </LoadingOverlay>
      </StoryContainer>
    );
  }

  // Show error if story failed to load
  if (error) {
    return (
      <StoryContainer>
        <ErrorContainer
          as={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <ErrorMessage>
            Error al cargar la historia: {error}
          </ErrorMessage>
          <div>
            <RetryButton onClick={handleRetry}>
              Reintentar
            </RetryButton>
            <RetryButton onClick={handleGoHome} $secondary>
              Volver al inicio
            </RetryButton>
          </div>
        </ErrorContainer>
      </StoryContainer>
    );
  }

  return (
    <StoryContainer>
      <AnimatePresence mode="wait">
        <motion.div
          key="story"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', height: '100%' }}
        >
          <StoryRenderer />
        </motion.div>
      </AnimatePresence>
    </StoryContainer>
  );
};

export default StoryPage;