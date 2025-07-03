// src/components/Layout/Layout.styles.js
import styled from 'styled-components';

export const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  /* Story mode - fullscreen immersive experience */
  ${({ $isStoryMode }) => $isStoryMode && `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
    overflow: hidden;
  `}
`;

export const MainContent = styled.main`
  flex: 1;
  position: relative;
  width: 100%;
  height: 100%;
  transition: padding 0.3s ease;

  /* Normal pages content */
  ${({ $isStoryMode }) => !$isStoryMode && `
    min-height: calc(100vh - 60px);
    padding-top: 60px;
    
    @media (max-width: 768px) {
      min-height: calc(100vh - 50px);
      padding-top: 50px;
    }
  `}

  /* Story page content - fullscreen */
  ${({ $isStoryMode }) => $isStoryMode && `
    height: 100vh;
    padding: 0;
  `}
`;

export const StoryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at center,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  pointer-events: none;
  z-index: 1;
`;