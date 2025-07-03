// src/pages/StoryPage.styles.js
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
`;

export const StoryContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #000;
  
  /* Prevent scrolling and zooming */
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  
  /* Hide scrollbars */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  color: white;
`;

export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    border-width: 2px;
  }
`;

export const LoadingText = styled.div`
  font-size: 1.2rem;
  font-weight: 300;
  text-align: center;
  opacity: 0.9;
  animation: ${pulse} 2s ease-in-out infinite;
  max-width: 80%;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const ErrorContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  max-width: 90%;
  width: 400px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 9999;
  
  @media (max-width: 768px) {
    padding: 30px 20px;
    max-width: 95%;
  }
`;

export const ErrorMessage = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 25px;
  }
`;

export const RetryButton = styled.button`
  background: ${({ $secondary }) => 
    $secondary ? 'transparent' : 'rgba(255, 255, 255, 0.1)'};
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 25px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  margin: 0 10px;
  
  &:hover {
    background: ${({ $secondary }) => 
      $secondary ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'};
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    display: block;
    margin: 10px auto;
    width: 100%;
    max-width: 200px;
  }
`;