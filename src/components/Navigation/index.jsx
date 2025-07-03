// src/components/Navigation/index.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import { 
  NavigationContainer, 
  NavContainer, 
  NavBrand, 
  BrandText,
  NavLinks, 
  NavLink 
} from './Navigation.styles';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <NavigationContainer>
      <NavContainer>
        {/* Brand/Logo */}
        <NavBrand as={Link} to="/" onClick={closeMenu}>
          <BrandText>Parallax Story</BrandText>
        </NavBrand>
        
        {/* Desktop navigation links */}
        <NavLinks>
          <NavLink 
            as={Link}
            to="/" 
            $isActive={isActive('/')}
            onClick={closeMenu}
          >
            Inicio
          </NavLink>
          <NavLink 
            as={Link}
            to="/story" 
            $isActive={isActive('/story')}
            onClick={closeMenu}
          >
            Historia
          </NavLink>
          <NavLink 
            as={Link}
            to="/about" 
            $isActive={isActive('/about')}
            onClick={closeMenu}
          >
            Acerca
          </NavLink>
        </NavLinks>

        {/* Hamburger menu for mobile */}
        <HamburgerMenu 
          isOpen={isMenuOpen} 
          onToggle={toggleMenu}
          onClose={closeMenu}
        />
      </NavContainer>
    </NavigationContainer>
  );
};

export default Navigation;