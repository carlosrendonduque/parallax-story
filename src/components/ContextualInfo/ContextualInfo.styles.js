// src/components/ContextualInfo/ContextualInfo.styles.js
import styled, { keyframes, css } from 'styled-components';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const getStatusColor = (status) => {
  switch (status) {
    case 'active':
      return '#4CAF50';
    case 'simulated':
      return '#FF9800';
    case 'loading':
      return '#2196F3';
    case 'error':
    default:
      return '#F44336';
  }
};

export const InfoContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
  max-width: 300px;
  
  @media (max-width: 768px) {
    top: 15px;
    right: 15px;
    max-width: 250px;
  }
`;

export const InfoPanel = styled.div`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 15px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.8);
    border-color: rgba(255, 255, 255, 0.2);
    transform: scale(1.02);
  }
  
  @media (max-width: 768px) {
    padding: 12px;
    border-radius: 12px;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  position: relative;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    gap: 8px;
    margin-bottom: 6px;
  }
`;

export const InfoIcon = styled.span`
  font-size: 1rem;
  min-width: 20px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    min-width: 18px;
  }
`;

export const InfoText = styled.span`
  font-size: 0.85rem;
  opacity: 0.9;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  ${({ $status }) => $status === 'loading' && css`
    animation: ${pulse} 1.5s ease-in-out infinite;
  `}
  
  ${({ $status }) => $status === 'simulated' && css`
    font-style: italic;
    opacity: 0.8;
  `}
  
  ${({ $status }) => $status === 'error' && css`
    opacity: 0.6;
  `}
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const StatusIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $status }) => getStatusColor($status)};
  flex-shrink: 0;
  
  ${({ $status }) => $status === 'loading' && css`
    animation: ${pulse} 1s ease-in-out infinite;
  `}
  
  ${({ $status }) => $status === 'active' && css`
    box-shadow: 0 0 10px ${getStatusColor($status)};
  `}
  
  @media (max-width: 768px) {
    width: 6px;
    height: 6px;
  }
`;

export const ToggleButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: white;
    transform: scale(1.2);
  }
  
  ${({ $isExpanded }) => $isExpanded && css`
    color: #FFD700;
  `}
  
  @media (max-width: 768px) {
    top: 8px;
    right: 8px;
    font-size: 0.7rem;
    width: 18px;
    height: 18px;
  }
`;

export const DetailedView = styled.div`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 15px;
  margin-top: 10px;
  color: white;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 12px;
    border-radius: 12px;
    margin-top: 8px;
  }
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

export const DetailLabel = styled.div`
  font-size: 0.75rem;
  opacity: 0.7;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

export const DetailValue = styled.div`
  font-size: 0.8rem;
  opacity: 0.9;
  font-family: monospace;
  word-break: break-all;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;