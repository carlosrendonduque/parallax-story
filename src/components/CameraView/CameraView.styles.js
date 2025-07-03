// src/components/CameraView/CameraView.styles.js
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

export const CameraContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: #000;
  z-index: 1;
`;

export const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ $isReady }) => $isReady ? 1 : 0};
  transition: opacity 0.5s ease;
  
  /* Prevent video controls on mobile */
  &::-webkit-media-controls {
    display: none !important;
  }
  
  &::-webkit-media-controls-panel {
    display: none !important;
  }
`;

export const StaticBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    #1a1a2e 0%,
    #16213e 25%,
    #0f3460 50%,
    #16213e 75%,
    #1a1a2e 100%
  );
  background-size: 400% 400%;
  animation: ${float} 20s ease-in-out infinite;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(118, 75, 162, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
  }
`;

export const ParticleEffect = styled.div`
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  box-shadow: 
    0 0 10px rgba(255, 255, 255, 0.3),
    0 0 20px rgba(255, 255, 255, 0.1);
`;

export const FallbackContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

export const FallbackContent = styled.div`
  text-align: center;
  color: white;
  padding: 40px 20px;
  max-width: 400px;
  
  p {
    font-size: 1rem;
    opacity: 0.8;
    margin: 15px 0;
    line-height: 1.5;
  }
  
  @media (max-width: 768px) {
    padding: 30px 15px;
    max-width: 90%;
    
    p {
      font-size: 0.9rem;
    }
  }
`;

export const CameraStatus = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 20px;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 15px;
  }
`;

export const ErrorMessage = styled.div`
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  border-radius: 10px;
  padding: 15px;
  margin: 20px 0;
  font-size: 0.9rem;
  line-height: 1.4;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    padding: 12px;
    font-size: 0.8rem;
    margin: 15px 0;
  }
`;

export const RetryButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 25px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  margin-top: 20px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.8rem;
    margin-top: 15px;
  }
`;

export const LoadingIndicator = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    border-width: 2px;
    margin-bottom: 15px;
  }
`;

export const CameraControls = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 10;
  
  @media (max-width: 768px) {
    bottom: 15px;
    right: 15px;
  }
`;

export const SwitchCameraButton = styled.button`
  background: rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(0, 0, 0, 0.7);
    border-color: rgba(255, 255, 255, 0.5);
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    font-size: 1rem;
  }
`;