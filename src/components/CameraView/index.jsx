// src/components/CameraView/index.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDevice } from '../../context/DeviceContext';
import {
  CameraContainer,
  VideoElement,
  FallbackContainer,
  FallbackContent,
  ErrorMessage,
  RetryButton,
  LoadingIndicator,
  CameraControls,
  SwitchCameraButton,
  CameraStatus,
  StaticBackground,
  ParticleEffect
} from './CameraView.styles';

const CameraView = () => {
  const { 
    cameraStream, 
    cameraError, 
    isLoadingCamera,
    requestCameraPermission,
    switchCamera,
    cameraFacingMode,
    isSupported
  } = useDevice();
  
  const videoRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Set up video stream when available
  useEffect(() => {
    if (cameraStream && videoRef.current) {
      videoRef.current.srcObject = cameraStream;
      setIsVideoReady(false);
    }
  }, [cameraStream]);

  // Handle video ready state
  const handleVideoReady = () => {
    setIsVideoReady(true);
  };

  const handleVideoError = (error) => {
    console.error('Video playback error:', error);
    setIsVideoReady(false);
  };

  // Show camera controls temporarily
  const handleShowControls = () => {
    setShowControls(true);
    setTimeout(() => setShowControls(false), 3000);
  };

  const handleRetry = () => {
    requestCameraPermission();
  };

  const handleSwitchCamera = () => {
    switchCamera();
  };

  // Render loading state
  if (isLoadingCamera) {
    return (
      <CameraContainer>
        <StaticBackground />
        <FallbackContainer>
          <LoadingIndicator
            as={motion.div}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p>Iniciando cámara...</p>
          </motion.div>
        </FallbackContainer>
      </CameraContainer>
    );
  }

  // Render error state with fallback
  if (cameraError || !cameraStream) {
    return (
      <CameraContainer>
        <StaticBackground>
          {/* Animated particles for visual interest */}
          <ParticleEffect
            as={motion.div}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ top: '20%', left: '15%' }}
          />
          <ParticleEffect
            as={motion.div}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            style={{ top: '60%', right: '20%' }}
          />
          <ParticleEffect
            as={motion.div}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            style={{ bottom: '25%', left: '25%' }}
          />
        </StaticBackground>
        
        <FallbackContainer>
          <FallbackContent
            as={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CameraStatus>🌌 Experiencia Dimensional Activa</CameraStatus>
            
            {cameraError && (
              <ErrorMessage>
                {cameraError}
              </ErrorMessage>
            )}
            
            <p>Tu historia se adapta a tu ubicación y movimiento, creando una experiencia única en cada lectura.</p>
            
            <p>La conexión interdimensional está establecida.</p>
            
            {isSupported.camera && (
              <RetryButton
                onClick={handleRetry}
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reintentar cámara
              </RetryButton>
            )}
          </FallbackContent>
        </FallbackContainer>
      </CameraContainer>
    );
  }

  // Render camera view
  return (
    <CameraContainer onClick={handleShowControls}>
      <VideoElement
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onLoadedData={handleVideoReady}
        onError={handleVideoError}
        $isReady={isVideoReady}
      />
      
      {/* Loading overlay while video loads */}
      <AnimatePresence>
        {!isVideoReady && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              zIndex: 5
            }}
          >
            <LoadingIndicator
              as={motion.div}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Camera controls */}
      <AnimatePresence>
        {showControls && isSupported.camera && (
          <CameraControls
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <SwitchCameraButton
              onClick={handleSwitchCamera}
              as={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={`Cambiar a cámara ${cameraFacingMode === 'environment' ? 'frontal' : 'trasera'}`}
            >
              🔄
            </SwitchCameraButton>
          </CameraControls>
        )}
      </AnimatePresence>
    </CameraContainer>
  );
};

export default CameraView;