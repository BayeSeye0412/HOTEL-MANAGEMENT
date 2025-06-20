'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const GlobalStyle = createGlobalStyle`
  :root {
    /* Couleurs principales */
    --primary-color: #667eea;
    --primary-dark: #5a6fd8;
    --primary-light: rgba(102, 126, 234, 0.1);
    --secondary-color: #764ba2;
    --secondary-dark: #6a4190;
    --secondary-light: rgba(118, 75, 162, 0.1);
    
    /* Couleurs de succès */
    --success-color: #27ae60;
    --success-light: rgba(39, 174, 96, 0.1);
    
    /* Couleurs d'erreur */
    --error-color: #e74c3c;
    --error-light: rgba(231, 76, 60, 0.1);
    
    /* Couleurs d'avertissement */
    --warning-color: #f39c12;
    --warning-light: rgba(243, 156, 18, 0.1);
    
    /* Couleurs d'information */
    --info-color: #3498db;
    --info-light: rgba(52, 152, 219, 0.1);
    
    /* Espacements */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
    
    /* Rayons de bordure */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;
    
    /* Ombres */
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1);
    
    /* Transitions */
    --transition-fast: 0.15s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
  }

  /* Mode clair (par défaut) */
  [data-theme="light"] {
    --bg-primary: #ffffff;
    --bg-secondary: #f8fafc;
    --bg-tertiary: #f1f5f9;
    --text-primary: #1e293b;
    --text-secondary: #64748b;
    --text-muted: #94a3b8;
    --border-color: #e2e8f0;
    --border-light: #f1f5f9;
  }

  /* Mode sombre */
  [data-theme="dark"] {
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --bg-tertiary: #334155;
    --text-primary: #f8fafc;
    --text-secondary: #cbd5e1;
    --text-muted: #64748b;
    --border-color: #334155;
    --border-light: #475569;
  }

  /* Mode système - suit les préférences système */
  [data-theme="system"] {
    /* Les couleurs seront définies par les media queries ci-dessous */
  }

  /* Media query pour le mode sombre système */
  @media (prefers-color-scheme: dark) {
    [data-theme="system"] {
      --bg-primary: #0f172a;
      --bg-secondary: #1e293b;
      --bg-tertiary: #334155;
      --text-primary: #f8fafc;
      --text-secondary: #cbd5e1;
      --text-muted: #64748b;
      --border-color: #334155;
      --border-light: #475569;
    }
  }

  /* Media query pour le mode clair système */
  @media (prefers-color-scheme: light) {
    [data-theme="system"] {
      --bg-primary: #ffffff;
      --bg-secondary: #f8fafc;
      --bg-tertiary: #f1f5f9;
      --text-primary: #1e293b;
      --text-secondary: #64748b;
      --text-muted: #94a3b8;
      --border-color: #e2e8f0;
      --border-light: #f1f5f9;
    }
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    transition: background-color var(--transition-normal), color var(--transition-normal);
  }

  /* Scrollbar personnalisée */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-secondary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--text-muted);
  }
`;

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system');
  const [systemTheme, setSystemTheme] = useState('light');

  // Détecter le thème système
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemTheme = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', updateSystemTheme);

    return () => mediaQuery.removeEventListener('change', updateSystemTheme);
  }, []);

  // Charger le thème depuis localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Appliquer le thème au document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark');
  const isLight = theme === 'light' || (theme === 'system' && systemTheme === 'light');
  const isSystem = theme === 'system';

  const value = {
    theme,
    toggleTheme,
    isDark,
    isLight,
    isSystem,
    systemTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      <GlobalStyle />
      {children}
    </ThemeContext.Provider>
  );
}; 