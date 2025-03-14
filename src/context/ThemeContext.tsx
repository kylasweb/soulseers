
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'cyber';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if we're in a browser environment before accessing localStorage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('soulseer-theme');
      return (savedTheme as Theme) || 'light';
    }
    return 'light';
  });

  // Apply theme to document and save to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Save theme preference
    localStorage.setItem('soulseer-theme', theme);
    
    // Apply theme class to document root
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark', 'cyber');
    root.classList.add(theme);
    
    // Add a transition class for smooth theme changes
    root.classList.add('theme-transition');
    
    // Apply custom meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      switch (theme) {
        case 'light':
          metaThemeColor.setAttribute('content', '#ffffff');
          break;
        case 'dark': 
          metaThemeColor.setAttribute('content', '#121212');
          break;
        case 'cyber':
          metaThemeColor.setAttribute('content', '#0c1221');
          break;
      }
    }
    
    // Remove transition class after theme change completes
    const timeoutId = setTimeout(() => {
      root.classList.remove('theme-transition');
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
