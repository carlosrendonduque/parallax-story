// src/components/ContextualInfo/index.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from '../../context/LocationContext';
import { useDevice } from '../../context/DeviceContext';
import {
  InfoContainer,
  InfoPanel,
  InfoItem,
  InfoIcon,
  InfoText,
  ToggleButton,
  DetailedView,
  DetailItem,
  DetailLabel,
  DetailValue,
  StatusIndicator
} from './ContextualInfo.styles';

const ContextualInfo = () => {
  const { 
    address, 
    weather, 
    currentTime, 
    parallelTime,
    isLoadingLocation, 
    isLoadingWeather,
    hasLocationPermission 
  } = useLocation();
  
  const { 
    currentTime: deviceTime, 
    hasCameraPermission,
    hasOrientationPermission,
    isSupported
  } = useDevice();
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Auto-hide after showing for a while
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(false);
    }, 10000); // Hide after 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Get status indicators
  const getLocationStatus = () => {
    if (isLoadingLocation) return 'loading';
    if (hasLocationPermission && address) return 'active';
    if (address && address.includes('simulado')) return 'simulated';
    return 'error';
  };

  const getWeatherStatus = () => {
    if (isLoadingWeather) return 'loading';
    if (weather?.current) return weather.current.includes('simulado') ? 'simulated' : 'active';
    return 'error';
  };

  const getTimeStatus = () => {
    return (currentTime || deviceTime) ? 'active' : 'error';
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const panelVariants = {
    collapsed: {
      height: 'auto',
      opacity: 1
    },
    expanded: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <InfoContainer
      as={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <InfoPanel
        as={motion.div}
        variants={panelVariants}
        animate={isExpanded ? "expanded" : "collapsed"}
        onClick={toggleExpanded}
      >
        {/* Basic info items */}
        <motion.div variants={itemVariants}>
          <InfoItem>
            <InfoIcon>📍</InfoIcon>
            <InfoText $status={getLocationStatus()}>
              {isLoadingLocation ? 'Detectando...' : (address || 'Ubicación desconocida')}
            </InfoText>
            <StatusIndicator $status={getLocationStatus()} />
          </InfoItem>
        </motion.div>

        <motion.div variants={itemVariants}>
          <InfoItem>
            <InfoIcon>🕐</InfoIcon>
            <InfoText $status={getTimeStatus()}>
              {currentTime || deviceTime || 'Hora desconocida'}
            </InfoText>
            <StatusIndicator $status={getTimeStatus()} />
          </InfoItem>
        </motion.div>

        <motion.div variants={itemVariants}>
          <InfoItem>
            <InfoIcon>🌤️</InfoIcon>
            <InfoText $status={getWeatherStatus()}>
              {isLoadingWeather ? 'Detectando...' : (weather?.current || 'Clima desconocido')}
            </InfoText>
            <StatusIndicator $status={getWeatherStatus()} />
          </InfoItem>
        </motion.div>

        {/* Expand/collapse button */}
        <ToggleButton
          as={motion.button}
          onClick={(e) => {
            e.stopPropagation();
            toggleExpanded();
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          $isExpanded={isExpanded}
        >
          {isExpanded ? '▲' : '▼'}
        </ToggleButton>
      </InfoPanel>

      {/* Detailed view */}
      <AnimatePresence>
        {isExpanded && (
          <DetailedView
            as={motion.div}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DetailItem>
              <DetailLabel>Dimensión Paralela:</DetailLabel>
              <DetailValue>{parallelTime || 'Desconocida'}</DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel>Clima Paralelo:</DetailLabel>
              <DetailValue>{weather?.parallel || 'Energía dimensional'}</DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel>Permisos:</DetailLabel>
              <DetailValue>
                📷 {hasCameraPermission ? '✅' : '❌'} | 
                📍 {hasLocationPermission ? '✅' : '❌'} | 
                📱 {hasOrientationPermission ? '✅' : '❌'}
              </DetailValue>
            </DetailItem>

            <DetailItem>
              <DetailLabel>Soporte:</DetailLabel>
              <DetailValue>
                Cámara: {isSupported.camera ? '✅' : '❌'} | 
                Sensores: {isSupported.orientation ? '✅' : '❌'} | 
                Touch: {isSupported.touch ? '✅' : '❌'}
              </DetailValue>
            </DetailItem>

            <motion.button
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '15px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                marginTop: '10px'
              }}
              onClick={toggleDetails}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showDetails ? 'Ocultar detalles técnicos' : 'Ver detalles técnicos'}
            </motion.button>

            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ marginTop: '10px', fontSize: '0.7rem', opacity: 0.7 }}
                >
                  <div>User Agent: {navigator.userAgent.slice(0, 50)}...</div>
                  <div>Screen: {window.screen.width}x{window.screen.height}</div>
                  <div>Viewport: {window.innerWidth}x{window.innerHeight}</div>
                  <div>Connection: {navigator.connection?.effectiveType || 'unknown'}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </DetailedView>
        )}
      </AnimatePresence>
    </InfoContainer>
  );
};

export default ContextualInfo;