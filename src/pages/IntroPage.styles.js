// src/pages/IntroPage.styles.js
import styled from 'styled-components';

export const IntroContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  color: white;
  text-align: center;
  padding: 40px 20px;
`;

export const BackgroundGradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: -2;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 30% 20%,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 70% 80%,
      rgba(255, 255, 255, 0.05) 0%,
      transparent 50%
    );
    z-index: -1;
  }
`;

export const FloatingParticle = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  z-index: 1;
`;

export const IntroContent = styled.div`
  max-width: 600px;
  width: 100%;
  z-index: 2;
`;

export const IntroTitle = styled.h1`
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 300;
  margin-bottom: 30px;
  font-family: 'Georgia', serif;
  letter-spacing: 2px;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const IntroSubtitle = styled.div`
  font-size: clamp(1.1rem, 4vw, 1.4rem);
  margin-bottom: 30px;
  opacity: 0.9;
  font-weight: 300;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const IntroDescription = styled.div`
  font-size: clamp(0.9rem, 3vw, 1.1rem);
  line-height: 1.6;
  margin-bottom: 50px;
  opacity: 0.8;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

export const StartButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 18px 40px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 50px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s ease;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  @media (max-width: 768px) {
    padding: 15px 30px;
    font-size: 1rem;
  }
`;