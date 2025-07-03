// src/pages/AboutPage.styles.js
import styled from 'styled-components';

export const AboutContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  color: white;
`;

export const BackgroundGradient = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    #1a1a2e 0%,
    #16213e 25%,
    #0f3460 50%,
    #16213e 75%,
    #1a1a2e 100%
  );
  z-index: -2;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%);
    z-index: -1;
  }
`;

export const FloatingElement = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  z-index: 1;
`;

export const AboutContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    padding: 30px 15px;
  }
`;

export const AboutTitle = styled.h1`
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: 300;
  text-align: center;
  margin-bottom: 40px;
  font-family: 'Georgia', serif;
  letter-spacing: 2px;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

export const AboutSection = styled.section`
  margin-bottom: 50px;
  
  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

export const SectionTitle = styled.h2`
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 400;
  margin-bottom: 20px;
  color: #FFD700;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
  
  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

export const SectionText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 20px;
  opacity: 0.9;
  text-align: justify;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 15px;
    text-align: left;
  }
`;

export const FeatureList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
    margin-top: 20px;
  }
`;

export const FeatureItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  align-items: flex-start;
  gap: 15px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
  
  .icon {
    font-size: 2rem;
    flex-shrink: 0;
    margin-top: 5px;
  }
  
  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 8px;
    color: #FFD700;
  }
  
  p {
    font-size: 0.9rem;
    line-height: 1.5;
    opacity: 0.8;
    margin: 0;
  }
  
  @media (max-width: 768px) {
    padding: 15px;
    gap: 12px;
    
    .icon {
      font-size: 1.5rem;
    }
    
    h4 {
      font-size: 1rem;
      margin-bottom: 6px;
    }
    
    p {
      font-size: 0.85rem;
    }
  }
`;

export const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
  
  @media (max-width: 768px) {
    gap: 10px;
  }
`;

export const TechItem = styled.div`
  background: rgba(102, 126, 234, 0.2);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(102, 126, 234, 0.3);
    border-color: rgba(102, 126, 234, 0.5);
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 50px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
    margin-top: 40px;
  }
`;

export const TryButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 50px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
  }
  
  @media (max-width: 768px) {
    padding: 12px 25px;
    font-size: 1rem;
    width: 100%;
    max-width: 250px;
  }
`;

export const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 15px 30px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 50px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    padding: 12px 25px;
    font-size: 0.9rem;
    width: 100%;
    max-width: 200px;
  }
`;