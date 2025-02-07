import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context == undefined) throw new Error('useTheme debe ser usado dentro de un Provider')

  return context;
}

export { useTheme }