// src/pages/IntroPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  IntroContainer,
  IntroContent,
  IntroTitle,
  IntroSubtitle,
  IntroDescription,
  StartButton,
  BackgroundGradient,
  FloatingParticle
} from './IntroPage.styles';

const IntroPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/permissions');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <IntroContainer>
      <BackgroundGradient />
      
      {/* Floating particles for ambiance */}
      <FloatingParticle
        as={motion.div}
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ top: '20%', left: '10%' }}
      />
      <FloatingParticle
        as={motion.div}
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{ top: '60%', right: '15%' }}
      />
      <FloatingParticle
        as={motion.div}
        animate={{
          y: [0, -25, 0],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{ bottom: '30%', left: '20%' }}
      />

      <IntroContent
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <IntroTitle
          as={motion.h1}
          variants={titleVariants}
        >
          Parallax Story
        </IntroTitle>
        
        <IntroSubtitle
          as={motion.div}
          variants={itemVariants}
        >
          Una historia que conoce tu realidad
        </IntroSubtitle>
        
        <IntroDescription
          as={motion.div}
          variants={itemVariants}
        >
          Explora una narrativa que se adapta a tu ubicación, tiempo y movimiento.
          Cada página cambia según donde estés y cómo muevas tu dispositivo.
        </IntroDescription>
        
        <StartButton
          as={motion.button}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleStart}
        >
          Comenzar Experiencia
        </StartButton>
      </IntroContent>
    </IntroContainer>
  );
};

export default IntroPage;