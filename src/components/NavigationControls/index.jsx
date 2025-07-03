// src/components/NavigationControls/index.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStory } from '../../context/StoryContext';
import {
  ControlsContainer,
  NavigationButton,
  PageIndicator,
  CurrentPage,
  Separator,
  TotalPages,
  ProgressBar,
  ProgressFill,
  SwipeHint,
  KeyboardHint
} from './NavigationControls.styles';

const NavigationControls = ({ 
  currentPage, 
  totalPages, 
  onNext, 
  onPrevious,
  isFirstPage,
  isLastPage
}) => {
  const { getProgress } = useStory();
  const [showHints, setShowHints] = useState(true);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  // Hide hints after user interaction or timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHints(false);
    }, 5000); // Hide after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Hide hints on first interaction
  const handleInteraction = (action) => {
    setShowHints(false);
    setLastInteraction(Date.now());
    action();
  };

  // Show hints again if user is idle
  useEffect(() => {
    const checkIdle = setInterval(() => {
      if (Date.now() - lastInteraction > 30000) { // 30 seconds idle
        setShowHints(true);
      }
    }, 5000);

    return () => clearInterval(checkIdle);
  }, [lastInteraction]);

  const progress = getProgress();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    },
    disabled: {
      opacity: 0.3,
      scale: 1
    }
  };

  const hintVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 2
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <ControlsContainer
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Progress bar */}
      <ProgressBar
        as={motion.div}
        variants={itemVariants}
      >
        <ProgressFill
          as={motion.div}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </ProgressBar>

      {/* Navigation buttons and page indicator */}
      <motion.div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '20px',
          justifyContent: 'center'
        }}
        variants={itemVariants}
      >
        {/* Previous button */}
        <NavigationButton
          as={motion.button}
          variants={buttonVariants}
          whileHover={!isFirstPage ? "hover" : undefined}
          whileTap={!isFirstPage ? "tap" : undefined}
          animate={isFirstPage ? "disabled" : undefined}
          onClick={() => handleInteraction(onPrevious)}
          disabled={isFirstPage}
          aria-label="Página anterior"
          $isDisabled={isFirstPage}
        >
          ←
        </NavigationButton>
        
        {/* Page indicator */}
        <PageIndicator
          as={motion.div}
          variants={itemVariants}
        >
          <CurrentPage>{currentPage + 1}</CurrentPage>
          <Separator>/</Separator>
          <TotalPages>{totalPages}</TotalPages>
        </PageIndicator>
        
        {/* Next button */}
        <NavigationButton
          as={motion.button}
          variants={buttonVariants}
          whileHover={!isLastPage ? "hover" : undefined}
          whileTap={!isLastPage ? "tap" : undefined}
          animate={isLastPage ? "disabled" : undefined}
          onClick={() => handleInteraction(onNext)}
          disabled={isLastPage}
          aria-label="Página siguiente"
          $isDisabled={isLastPage}
        >
          →
        </NavigationButton>
      </motion.div>

      {/* Interaction hints */}
      <AnimatePresence>
        {showHints && (
          <motion.div
            variants={hintVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'absolute',
              bottom: '80px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            {/* Mobile swipe hint */}
            <SwipeHint
              as={motion.div}
              animate={{
                x: [-10, 10, -10],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              👆 Desliza o toca las flechas
            </SwipeHint>
            
            {/* Desktop keyboard hint */}
            <KeyboardHint>
              ⌨️ Usa las flechas del teclado
            </KeyboardHint>
          </motion.div>
        )}
      </AnimatePresence>
    </ControlsContainer>
  );
};

export default NavigationControls;