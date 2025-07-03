// src/components/Navigation/HamburgerMenu.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStory } from '../../context/StoryContext';
import {
  HamburgerButton,
  HamburgerLine,
  MenuOverlay,
  MenuBackdrop,
  MenuContent,
  CloseButton,
  MenuNav,
  MenuItem,
  MenuButton,
  ItemNumber,
  ItemText,
  MenuFooter
} from './HamburgerMenu.styles';

const HamburgerMenu = ({ isOpen, onToggle, onClose }) => {
  const navigate = useNavigate();
  const { resetStory } = useStory();

  const handleRestart = () => {
    resetStory();
    navigate('/');
    onClose();
  };

  const handleMenuItemClick = () => {
    onClose();
  };

  return (
    <>
      {/* Hamburger button */}
      <HamburgerButton 
        $isOpen={isOpen}
        onClick={onToggle}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <HamburgerLine $isOpen={isOpen} $lineIndex={0} />
        <HamburgerLine $isOpen={isOpen} $lineIndex={1} />
        <HamburgerLine $isOpen={isOpen} $lineIndex={2} />
      </HamburgerButton>
      
      {/* Menu overlay */}
      <MenuOverlay $isOpen={isOpen}>
        {/* Background blur */}
        <MenuBackdrop onClick={onClose} />
        
        {/* Menu content */}
        <MenuContent $isOpen={isOpen}>
          {/* Close button */}
          <CloseButton 
            onClick={onClose}
            aria-label="Close menu"
          >
            ×
          </CloseButton>
          
          {/* Menu items */}
          <MenuNav>
            <MenuItem 
              as={Link}
              to="/" 
              onClick={handleMenuItemClick}
            >
              <ItemNumber>01</ItemNumber>
              <ItemText>Inicio</ItemText>
            </MenuItem>
            
            <MenuItem 
              as={Link}
              to="/story"
              onClick={handleMenuItemClick}
            >
              <ItemNumber>02</ItemNumber>
              <ItemText>Historia</ItemText>
            </MenuItem>
            
            <MenuItem 
              as={Link}
              to="/about"
              onClick={handleMenuItemClick}
            >
              <ItemNumber>03</ItemNumber>
              <ItemText>Acerca</ItemText>
            </MenuItem>
            
            <MenuButton 
              onClick={handleRestart}
            >
              <ItemNumber>04</ItemNumber>
              <ItemText>Reiniciar</ItemText>
            </MenuButton>
          </MenuNav>
          
          {/* Footer info */}
          <MenuFooter>
            <p>Parallax Story</p>
            <p>Una narrativa dimensional</p>
          </MenuFooter>
        </MenuContent>
      </MenuOverlay>
    </>
  );
};

export default HamburgerMenu;