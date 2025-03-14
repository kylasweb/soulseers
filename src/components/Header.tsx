
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 cyber:bg-cyber-card backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-semibold text-soulseer-gold dark:text-soulseer-blue cyber:text-cyber-accent tracking-tighter">
              SoulSeer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/about">About</NavLink>
            <NavLink href="/readings">Book Reading</NavLink>
            <NavLink href="/sessions">Live Sessions</NavLink>
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/community">Community</NavLink>
            <NavLink href="/shop">Shop</NavLink>
          </nav>

          {/* Auth Buttons and Theme Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeSwitcher />
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeSwitcher />
            <button
              onClick={toggleMobileMenu}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-background dark:bg-gray-900 cyber:bg-cyber-background border-b border-border/50 shadow-md transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'max-h-screen opacity-100 visible py-5'
            : 'max-h-0 opacity-0 invisible py-0'
        } overflow-hidden`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex flex-col space-y-4 mb-6">
            <MobileNavLink href="/about" onClick={toggleMobileMenu}>
              About
            </MobileNavLink>
            <MobileNavLink href="/readings" onClick={toggleMobileMenu}>
              Book Reading
            </MobileNavLink>
            <MobileNavLink href="/sessions" onClick={toggleMobileMenu}>
              Live Sessions
            </MobileNavLink>
            <MobileNavLink href="/services" onClick={toggleMobileMenu}>
              Services
            </MobileNavLink>
            <MobileNavLink href="/community" onClick={toggleMobileMenu}>
              Community
            </MobileNavLink>
            <MobileNavLink href="/shop" onClick={toggleMobileMenu}>
              Shop
            </MobileNavLink>
          </nav>
          <div className="flex flex-col space-y-3 pb-5">
            <Button variant="outline" asChild className="w-full justify-center">
              <Link to="/login" onClick={toggleMobileMenu}>
                Login
              </Link>
            </Button>
            <Button asChild className="w-full justify-center">
              <Link to="/signup" onClick={toggleMobileMenu}>
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <Link
      to={href}
      className="relative text-foreground hover:text-soulseer-gold dark:hover:text-soulseer-blue cyber:hover:text-cyber-accent transition-colors animated-underline font-medium text-sm tracking-wide"
    >
      {children}
    </Link>
  );
};

interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({
  href,
  children,
  onClick,
}) => {
  return (
    <Link
      to={href}
      className="block py-2 text-foreground hover:text-soulseer-gold dark:hover:text-soulseer-blue cyber:hover:text-cyber-accent transition-colors text-base font-medium"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Header;
