import React, { createContext, useContext, useState, useEffect } from 'react';

type TextSize = 'normal' | 'large' | 'xl';
type ColorFilter = 'none' | 'grayscale' | 'protanopia' | 'deuteranopia' | 'tritanopia';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  colorFilter: ColorFilter;
  setColorFilter: (filter: ColorFilter) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [textSize, setTextSize] = useState<TextSize>('normal');
  const [colorFilter, setColorFilter] = useState<ColorFilter>('none');

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  useEffect(() => {
    // Handle Dark Mode
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    // Handle Text Size
    const sizeMap = {
      'normal': '100%',
      'large': '115%',
      'xl': '130%'
    };
    html.style.fontSize = sizeMap[textSize];

    // Handle Color Filter
    // Remove existing filter classes
    document.body.className = document.body.className.replace(/filter-\w+/g, '').trim();
    if (colorFilter !== 'none') {
      document.body.classList.add(`filter-${colorFilter}`);
    }

  }, [isDarkMode, textSize, colorFilter]);

  return (
    <ThemeContext.Provider value={{ 
      isDarkMode, 
      toggleDarkMode, 
      textSize, 
      setTextSize,
      colorFilter,
      setColorFilter
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};