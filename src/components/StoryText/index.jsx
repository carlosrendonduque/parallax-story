// src/components/StoryText/index.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from '../../context/LocationContext';
import { useDevice } from '../../context/DeviceContext';
import {
  TextContainer,
  TextContent,
  TypingCursor,
  HighlightedText
} from './StoryText.styles';

const StoryText = ({ text, pageId }) => {
  const { 
    getCurrentLocation, 
    getCurrentWeather, 
    getParallelWeather,
    currentTime,
    parallelTime,
    futureTime 
  } = useLocation();
  
  const { currentTime: deviceTime } = useDevice();
  
  const [processedText, setProcessedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  // Process text with contextual variables
  const processStoryText = (rawText) => {
    if (!rawText) return '';
    
    let processed = rawText;
    
    // Replace location variables
    processed = processed.replace(/\${location}/g, getCurrentLocation());
    
    // Replace time variables
    processed = processed.replace(/\${currentTime}/g, currentTime || deviceTime || 'ahora');
    processed = processed.replace(/\${parallelTime}/g, parallelTime || getRandomParallelTime());
    processed = processed.replace(/\${futureTime}/g, futureTime || getFutureTime());
    
    // Replace weather variables
    processed = processed.replace(/\${currentWeather}/g, getCurrentWeather());
    processed = processed.replace(/\${parallelWeather}/g, getParallelWeather());
    
    return processed;
  };

  // Generate random parallel time if not available
  const getRandomParallelTime = () => {
    const now = new Date();
    const randomOffset = (Math.random() * 12 - 6) * 60 * 60 * 1000;
    const parallelDate = new Date(now.getTime() + randomOffset);
    return parallelDate.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Generate future time
  const getFutureTime = () => {
    const now = new Date();
    const futureDate = new Date(now.getTime() + 30 * 60 * 1000);
    return futureDate.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Typewriter effect
  const animateText = (finalText) => {
    setIsAnimating(true);
    setDisplayedText('');
    
    let index = 0;
    const chars = finalText.split('');
    
    const interval = setInterval(() => {
      if (index < chars.length) {
        setDisplayedText(prev => prev + chars[index]);
        index++;
      } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 30); // Adjust speed here
    
    return () => clearInterval(interval);
  };

  // Process text when it changes
  useEffect(() => {
    if (text) {
      const processed = processStoryText(text);
      setProcessedText(processed);
      setDisplayedText(processed); // Show immediately, no animation
      setIsAnimating(false);
    }
  }, [text, pageId, getCurrentLocation, getCurrentWeather, getParallelWeather, currentTime, parallelTime, futureTime]);

  // Highlight certain words for emphasis
  const highlightWords = (text) => {
    const wordsToHighlight = [
      'dimensión paralela',
      'inclinas',
      'mueves',
      'cámara',
      'ubicación',
      'tiempo',
      'realidad',
      'fantasmas',
      'vibración',
      'conexión',
      'ondas dimensionales'
    ];
    
    let highlightedText = text;
    
    wordsToHighlight.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, `<highlight>$&</highlight>`);
    });
    
    return highlightedText;
  };

  // Split text into parts for highlighting
  const renderTextWithHighlights = (text) => {
    const parts = text.split('<highlight>');
    
    return parts.map((part, index) => {
      if (part.includes('</highlight>')) {
        const [highlighted, rest] = part.split('</highlight>');
        return (
          <React.Fragment key={index}>
            <HighlightedText>{highlighted}</HighlightedText>
            {rest}
          </React.Fragment>
        );
      }
      return part;
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  if (!text) {
    return (
      <TextContainer>
        <TextContent>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ opacity: 0.6 }}
          >
            Cargando historia...
          </motion.div>
        </TextContent>
      </TextContainer>
    );
  }

  return (
    <TextContainer
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      key={pageId} // Re-animate when page changes
    >
      <TextContent
        as={motion.div}
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        {renderTextWithHighlights(highlightWords(displayedText))}
        
        {/* Typing cursor */}
        {isAnimating && (
          <TypingCursor
            as={motion.span}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            |
          </TypingCursor>
        )}
      </TextContent>
    </TextContainer>
  );
};

export default StoryText;