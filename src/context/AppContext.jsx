import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [presentationMode, setPresentationMode] = useState(false);
  const [presentationStep, setPresentationStep] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  const togglePresentation = useCallback(() => {
    setPresentationMode((p) => {
      if (p) setPresentationStep(0);
      return !p;
    });
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        presentationMode,
        setPresentationMode,
        togglePresentation,
        presentationStep,
        setPresentationStep,
        selectedComponent,
        setSelectedComponent,
        isFullscreen,
        toggleFullscreen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
