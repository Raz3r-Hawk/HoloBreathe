import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark';

interface ThemeContextType {
  theme: Theme;
  effectiveTheme: 'dark';
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme] = useState<Theme>('dark');
  const [effectiveTheme] = useState<'dark'>('dark');

  useEffect(() => {
    // Force dark theme always
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add('dark');
    
    // Force dark theme application
    document.body.style.backgroundColor = 'hsl(224, 71%, 4%)';
    document.body.style.color = 'hsl(213, 31%, 91%)';

    // Save to localStorage
    localStorage.setItem('theme', 'dark');
  }, []);

  // No auto mode - always dark

  const setTheme = () => {
    // No-op since we only support dark theme
  };

  return (
    <ThemeContext.Provider value={{ theme, effectiveTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}