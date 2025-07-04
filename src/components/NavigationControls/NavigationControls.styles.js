// src/components/NavigationControls/NavigationControls.styles.js
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

export const ControlsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  width: 100%;
  z-index: 20;
  
  @media (max-width: 768px) {
    gap: 15px;
    padding: 15px;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  max-width: 300px;
  height: 2px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 1px;
  overflow: hidden;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    max-width: 250px;
    height: 2px;
  }
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: #333;
  border-radius: 1px;
  transition: width 0.6s ease;
  
  @media (max-width: 768px) {
    transition: width 0.4s ease;
  }
`;

export const NavigationButton = styled.button`
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: #333;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: ${({ $isDisabled }) => $isDisabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  font-size: 1.2rem;
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  /* Disabled state */
  ${({ $isDisabled }) => $isDisabled && `
    opacity: 0.3;
    pointer-events: none;
  `}
  
  /* Hover state */
  ${({ $isDisabled }) => !$isDisabled && `
    &:hover {
      background: rgba(0, 0, 0, 0.1);
      border-color: rgba(0, 0, 0, 0.2);
    }
    
    &:active {
      background: rgba(0, 0, 0, 0.15);
    }
  `}
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    font-size: 1rem;
  }
`;

export const PageIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.05);
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 6px 12px;
    gap: 6px;
  }
`;

export const CurrentPage = styled.span`
  color: #333;
  font-weight: 500;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const Separator = styled.span`
  color: #666;
  font-weight: 300;
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const TotalPages = styled.span`
  color: #666;
  font-weight: 400;
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const SwipeHint = styled.div`
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.8rem;
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  padding: 6px 12px;
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  
  @media (min-width: 769px) {
    display: none;
  }
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 5px 10px;
  }
`;

export const KeyboardHint = styled.div`
  color: rgba(0, 0, 0, 0.3);
  font-size: 0.75rem;
  text-align: center;
  background: rgba(0, 0, 0, 0.03);
  padding: 4px 8px;
  border-radius: 10px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;