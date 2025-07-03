// src/components/Navigation/HamburgerMenu.styles.js
import styled from 'styled-components';

export const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  position: relative;
  width: 30px;
  height: 30px;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  &:hover {
    opacity: 0.7;
  }
`;

export const HamburgerLine = styled.span`
  display: block;
  width: 20px;
  height: 2px;
  background: #333;
  transition: all 0.3s ease;
  position: absolute;
  
  /* Line positions and animations */
  ${({ $lineIndex, $isOpen }) => {
    if ($lineIndex === 0) {
      return `
        top: ${$isOpen ? '14px' : '8px'};
        transform: ${$isOpen ? 'rotate(45deg)' : 'rotate(0)'};
      `;
    }
    if ($lineIndex === 1) {
      return `
        top: 14px;
        opacity: ${$isOpen ? '0' : '1'};
      `;
    }
    if ($lineIndex === 2) {
      return `
        top: ${$isOpen ? '14px' : '20px'};
        transform: ${$isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
      `;
    }
  }}
`;

export const MenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
  opacity: ${({ $isOpen }) => $isOpen ? '1' : '0'};
  transition: all 0.3s ease;
`;

export const MenuBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
`;

export const MenuContent = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: min(400px, 80vw);
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 40px 40px;
  transform: ${({ $isOpen }) => $isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  box-shadow: -5px 0 20px rgba(0, 0, 0, 0.3);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
`;

export const MenuNav = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 40px;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  color: white;
  text-decoration: none;
  padding: 15px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    padding-left: 10px;
    border-radius: 8px;
  }
`;

export const MenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 20px;
  color: white;
  background: none;
  border: none;
  padding: 15px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 1rem;
  font-family: inherit;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    padding-left: 10px;
    border-radius: 8px;
  }
`;

export const ItemNumber = styled.span`
  font-size: 0.9rem;
  opacity: 0.7;
  font-weight: 300;
  min-width: 25px;
`;

export const ItemText = styled.span`
  font-size: 1.1rem;
  font-weight: 400;
`;

export const MenuFooter = styled.div`
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  
  p {
    margin: 5px 0;
    opacity: 0.8;
    
    &:first-child {
      font-weight: 600;
      font-size: 1.1rem;
    }
    
    &:last-child {
      font-size: 0.9rem;
      opacity: 0.6;
    }
  }
`;