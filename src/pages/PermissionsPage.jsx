// src/pages/PermissionsPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDevice } from '../context/DeviceContext';
import { useLocation } from '../context/LocationContext';
import {
  PermissionsContainer,
  PermissionsContent,
  PermissionsTitle,
  ImportantText,
  InstructionsList,
  InstructionItem,
  BrowserNote,
  ButtonContainer,
  PrimaryButton,
  SkipButton,
  LoadingSpinner,
  StatusMessage,
  BackgroundGradient
} from './PermissionsPage.styles';

const PermissionsPage = () => {
  const navigate = useNavigate();
  const { requestCameraPermission, isLoadingCamera, cameraError } = useDevice();
  const { requestLocationPermission } = useLocation();
  const [isRequesting, setIsRequesting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleRequestPermissions = async () => {
    setIsRequesting(true);
    setStatusMessage('Solicitando acceso a la cámara...');

    try {
      // Request camera permission
      await requestCameraPermission();
      
      setStatusMessage('Solicitando acceso a la ubicación...');
      
      // Request location permission
      await requestLocationPermission();
      
      setStatusMessage('¡Permisos concedidos! Iniciando experiencia...');
      
      // Wait a moment then navigate
      setTimeout(() => {
        navigate('/story');
      }, 1000);
      
    } catch (error) {
      setStatusMessage('Error al solicitar permisos. Puedes continuar sin ellos.');
      console.error('Permission error:', error);
    } finally {
      setIsRequesting(false);
    }
  };

  const handleSkipPermissions = () => {
    navigate('/story');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <PermissionsContainer>
      <BackgroundGradient />
      
      <PermissionsContent
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <PermissionsTitle
          as={motion.h1}
          variants={itemVariants}
        >
          Parallax Story
        </PermissionsTitle>
        
        <ImportantText
          as={motion.p}
          variants={itemVariants}
        >
          <strong>¡Importante!</strong> Esta experiencia necesita acceso a tu cámara y ubicación.
        </ImportantText>
        
        <motion.div variants={itemVariants}>
          <p><strong>Instrucciones:</strong></p>
          <InstructionsList>
            <InstructionItem>Toca "Comenzar experiencia"</InstructionItem>
            <InstructionItem>Cuando aparezca la ventana, toca "Permitir"</InstructionItem>
            <InstructionItem>Si no aparece, revisa la barra de direcciones del navegador</InstructionItem>
            <InstructionItem>Busca los íconos 📷 📍 y tócalos para activar</InstructionItem>
          </InstructionsList>
        </motion.div>
        
        <BrowserNote
          as={motion.p}
          variants={itemVariants}
        >
          Funciona mejor en Chrome o Firefox en móviles.
        </BrowserNote>
        
        {/* Status message */}
        {statusMessage && (
          <StatusMessage
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            $isError={!!cameraError}
          >
            {statusMessage}
          </StatusMessage>
        )}
        
        {/* Loading spinner */}
        {(isRequesting || isLoadingCamera) && (
          <LoadingSpinner
            as={motion.div}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
          />
        )}
        
        <ButtonContainer
          as={motion.div}
          variants={itemVariants}
        >
          <PrimaryButton
            onClick={handleRequestPermissions}
            disabled={isRequesting || isLoadingCamera}
            as={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isRequesting ? 'Solicitando permisos...' : 'Comenzar experiencia'}
          </PrimaryButton>
          
          <SkipButton
            onClick={handleSkipPermissions}
            as={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Modo sin permisos
          </SkipButton>
        </ButtonContainer>
      </PermissionsContent>
    </PermissionsContainer>
  );
};

export default PermissionsPage;