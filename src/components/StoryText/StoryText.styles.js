// src/components/StoryText/StoryText.styles.js
import styled from 'styled-components';

export const TextContainer = styled.div`
  width: 100%;
  max-width: 90%;
  margin: 0 auto;
  padding: 40px 20px;
  
  @media (max-width: 768px) {
    max-width: 95%;
    padding: 30px 15px;
  }
`;

export const TextContent = styled.div`
  font-size: clamp(1.2rem, 4vw, 1.6rem);
  line-height: 1.6;
  color: #333; /* Gris oscuro, más suave que negro puro */
  text-align: center;
  font-weight: 300;
  letter-spacing: 0.3px;
  font-family: 'Georgia', serif;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 60px 30px;
  
  /* Smooth text rendering */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  /* Better readability on mobile */
  @media (max-width: 768px) {
    line-height: 1.5;
    padding: 40px 20px;
    font-size: clamp(1.1rem, 4vw, 1.4rem);
    max-width: 90%;
  }
  
  /* Handle long words on small screens */
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
`;

export const HighlightedText = styled.span`
  color: #FFD700;
  font-weight: 500;
  text-shadow: 
    2px 2px 8px rgba(0, 0, 0, 0.8),
    0 0 15px rgba(255, 215, 0, 0.3);
  position: relative;
  
  /* Subtle glow effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 215, 0, 0.1) 50%,
      transparent 70%
    );
    border-radius: 3px;
    pointer-events: none;
    z-index: -1;
  }
  
  /* Animation on hover (if interactable) */
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    text-shadow: 
      1px 1px 6px rgba(0, 0, 0, 0.9),
      0 0 10px rgba(255, 215, 0, 0.2);
  }
`;

export const TypingCursor = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
  margin-left: 2px;
  font-size: 1.2em;
  
  @media (max-width: 768px) {
    font-size: 1.1em;
  }
`;