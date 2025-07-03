// src/pages/PermissionsPage.styles.js
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const PermissionsContainer = styled.div`
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
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  z-index: -1;
`;

export const PermissionsContent = styled.div`
  max-width: 500px;
  width: 100%;
  z-index: 2;
`;

export const PermissionsTitle = styled.h1`
  font-size: clamp(2rem, 6vw, 2.5rem);
  font-weight: 300;
  margin-bottom: 40px;
  font-family: 'Georgia', serif;
  letter-spacing: 1px;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

export const ImportantText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
  opacity: 0.95;
  
  strong {
    color: #FFD700;
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 25px;
  }
`;

export const InstructionsList = styled.ul`
  text-align: left;
  max-width: 350px;
  margin: 20px auto 30px;
  padding-left: 0;
  list-style: none;
  
  @media (max-width: 768px) {
    max-width: 300px;
    margin-bottom: 25px;
  }
`;

export const InstructionItem = styled.li`
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 12px;
  opacity: 0.9;
  padding-left: 20px;
  position: relative;
  
  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #FFD700;
    font-weight: bold;
    font-size: 1.2rem;
  }
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-bottom: 10px;
  }
`;

export const BrowserNote = styled.p`
  font-size: 0.9rem;
  margin-bottom: 40px;
  opacity: 0.8;
  font-style: italic;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 30px;
  }
`;

export const StatusMessage = styled.div`
  background: ${({ $isError }) => 
    $isError ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${({ $isError }) => 
    $isError ? 'rgba(255, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)'};
  color: ${({ $isError }) => $isError ? '#ffcccc' : 'white'};
  padding: 15px 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
`;

export const LoadingSpinner = styled.div`
  width: 30px;
  height: 30px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 20px auto;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

export const PrimaryButton = styled.button`
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
  min-width: 250px;
  
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
  
  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    
    &::before {
      left: 100%;
    }
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 15px 30px;
    font-size: 1rem;
    min-width: 200px;
  }
`;

export const SkipButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
  transition: all 0.3s ease;
  padding: 10px 20px;
  
  &:hover {
    color: white;
    text-decoration: none;
  }
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;