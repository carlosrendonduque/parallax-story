// src/pages/AboutPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  AboutContainer,
  AboutContent,
  AboutTitle,
  AboutSection,
  SectionTitle,
  SectionText,
  FeatureList,
  FeatureItem,
  TechStack,
  TechItem,
  BackButton,
  TryButton,
  ButtonContainer,
  BackgroundGradient,
  FloatingElement
} from './AboutPage.styles';

const AboutPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handleTryStory = () => {
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

  const features = [
    {
      icon: "📍",
      title: "Geolocalización Inteligente",
      description: "La historia se adapta a tu ubicación real usando APIs de geolocalización"
    },
    {
      icon: "📱",
      title: "Sensores de Movimiento",
      description: "Detecta la inclinación de tu dispositivo para efectos visuales inmersivos"
    },
    {
      icon: "📷",
      title: "Cámara en Tiempo Real",
      description: "Usa tu cámara como fondo para crear una experiencia de realidad aumentada"
    },
    {
      icon: "🕐",
      title: "Tiempo Contextual",
      description: "Integra la hora actual y genera tiempos paralelos para la narrativa"
    },
    {
      icon: "🌤️",
      title: "Datos Climáticos",
      description: "Incorpora información del clima para crear contrastes dimensionales"
    },
    {
      icon: "✋",
      title: "Controles Gestuales",
      description: "Navega con gestos táctiles, teclas del teclado o botones en pantalla"
    }
  ];

  const technologies = [
    "React 18", "Styled Components", "Framer Motion", "React Router", 
    "Context API", "Web APIs", "PWA Ready", "Responsive Design"
  ];

  return (
    <AboutContainer>
      <BackgroundGradient />
      
      {/* Floating decorative elements */}
      <FloatingElement
        as={motion.div}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ top: '15%', left: '10%' }}
      />
      <FloatingElement
        as={motion.div}
        animate={{
          y: [0, -30, 0],
          rotate: [0, -5, 0],
          opacity: [0.4, 0.7, 0.4]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{ top: '60%', right: '15%' }}
      />

      <AboutContent
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AboutTitle
          as={motion.h1}
          variants={itemVariants}
        >
          Parallax Story
        </AboutTitle>

        <AboutSection
          as={motion.section}
          variants={itemVariants}
        >
          <SectionTitle>Una Nueva Forma de Narrativa</SectionTitle>
          <SectionText>
            Parallax Story es una experiencia narrativa experimental que combina storytelling 
            tradicional con tecnologías web modernas. Cada historia se adapta dinámicamente 
            a tu contexto: dónde estás, qué hora es, cómo mueves tu dispositivo, y más.
          </SectionText>
          <SectionText>
            Inspirado en trabajos pioneros como "Breathe" de Kate Pullinger, este proyecto 
            explora las posibilidades de la literatura digital contextual y la narrativa ubicua.
          </SectionText>
        </AboutSection>

        <AboutSection
          as={motion.section}
          variants={itemVariants}
        >
          <SectionTitle>Características Principales</SectionTitle>
          <FeatureList>
            {features.map((feature, index) => (
              <FeatureItem
                key={index}
                as={motion.div}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <span className="icon">{feature.icon}</span>
                <div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </FeatureItem>
            ))}
          </FeatureList>
        </AboutSection>

        <AboutSection
          as={motion.section}
          variants={itemVariants}
        >
          <SectionTitle>Tecnologías Utilizadas</SectionTitle>
          <TechStack>
            {technologies.map((tech, index) => (
              <TechItem
                key={index}
                as={motion.div}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </TechItem>
            ))}
          </TechStack>
        </AboutSection>

        <AboutSection
          as={motion.section}
          variants={itemVariants}
        >
          <SectionTitle>Experiencia Inmersiva</SectionTitle>
          <SectionText>
            Esta aplicación funciona mejor en dispositivos móviles con permisos de cámara 
            y geolocalización activados. Sin embargo, también incluye modos de fallback 
            para garantizar que la experiencia sea accesible en cualquier dispositivo.
          </SectionText>
          <SectionText>
            La historia "Dimensión Paralela" incluye 25 páginas interactivas que se 
            transforman según tu contexto, creando una experiencia única para cada lector.
          </SectionText>
        </AboutSection>

        <ButtonContainer
          as={motion.div}
          variants={itemVariants}
        >
          <TryButton
            onClick={handleTryStory}
            as={motion.button}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Probar la Historia
          </TryButton>
          
          <BackButton
            onClick={handleBack}
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Volver al Inicio
          </BackButton>
        </ButtonContainer>
      </AboutContent>
    </AboutContainer>
  );
};

export default AboutPage;