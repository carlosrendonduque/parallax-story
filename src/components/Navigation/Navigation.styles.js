// src/components/Navigation/Navigation.styles.js
import styled from 'styled-components';

export const NavigationContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  height: 60px;
  
  @media (max-width: 768px) {
    height: 50px;
  }
`;

export const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavBrand = styled.div`
  text-decoration: none;
  color: #333;
  font-weight: 600;
  font-size: 1.2rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #667eea;
  }
`;

export const BrandText = styled.span`
  font-family: 'Georgia', serif;
  letter-spacing: 1px;
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavLink = styled.div`
  text-decoration: none;
  color: ${({ $isActive }) => $isActive ? '#667eea' : '#333'};
  font-weight: ${({ $isActive }) => $isActive ? '600' : '400'};
  font-size: 0.95rem;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: #667eea;
  }
  
  /* Active indicator */
  ${({ $isActive }) => $isActive && `
    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      right: 0;
      height: 2px;
      background: #667eea;
      border-radius: 1px;
    }
  `}
`;

/* Story Mode Styles - Discrete hamburger like Breathe */
export const StoryModeContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const DiscreteHamburger = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  width: 24px;
  height: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
  transition: all 0.3s ease;
  opacity: 0.6;
  
  &:hover {
    opacity: 1;
  }
  
  /* Hamburger lines */
  span {
    display: block;
    width: 16px;
    height: 1.5px;
    background: #333;
    transition: all 0.3s ease;
    border-radius: 1px;
    
    ${({ $isOpen }) => $isOpen && `
      &:nth-child(1) {
        transform: rotate(45deg) translate(4px, 4px);
      }
      &:nth-child(2) {
        opacity: 0;
      }
      &:nth-child(3) {
        transform: rotate(-45deg) translate(4px, -4px);
      }
    `}
  }
  
  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
    
    span {
      width: 14px;
      height: 1px;
    }
  }
`;