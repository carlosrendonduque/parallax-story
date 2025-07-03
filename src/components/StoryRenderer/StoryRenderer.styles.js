// src/components/StoryRenderer/StoryRenderer.styles.js
import styled from 'styled-components';

export const RendererContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #000;
  transition: transform 0.3s ease;
  
  /* Prevent text selection */
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  
  /* Prevent context menu on long press */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

export const StoryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  z-index: 10;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const StoryContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 800px;
  padding: 40px 20px;
  
  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;