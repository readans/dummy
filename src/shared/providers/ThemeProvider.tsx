import { useEffect, useState, useCallback } from "react";
import { ThemeContext } from "../context/ThemeContext";

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const colorScheme = localStorage.getItem('color-scheme');
    if (colorScheme !== null) return colorScheme == 'light' ? 'light' : 'dark';
    return mediaQuery.matches ? 'dark' : 'light';
  });

  useEffect(() => {

    const updateTheme = (event: MediaQueryListEvent | MediaQueryList) => {
      setTheme(event.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', updateTheme);

    return () => {
      mediaQuery.removeEventListener('change', updateTheme);
    };
  }, []);

  useEffect(() => {
    document.querySelector('html')?.classList.toggle('dark', theme === 'dark')
  }, [theme]);

  const changeTheme = useCallback(() => {
    setTheme((value) => {
      const newValue = value === 'light' ? 'dark' : 'light'
      localStorage.setItem('color-scheme', newValue)
      return newValue
    })
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
