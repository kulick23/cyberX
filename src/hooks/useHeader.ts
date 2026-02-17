import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useTheme } from "../ThemeContext";
import LogoLight from "../images/600px-CyberX_lightmode.png";
import LogoDark from "../images/600px-CyberX_darkmode.png";

export const useHeader = () => {
  const cartItems = useSelector((state: RootState) => state.cart.totalQuantity);
  const { theme, mode, setMode } = useTheme();
  const logoSrc = theme === "light" ? LogoLight : LogoDark;

  return {
    cartItems,
    mode,
    setMode,
    logoSrc,
  };
};
