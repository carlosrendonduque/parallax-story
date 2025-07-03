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