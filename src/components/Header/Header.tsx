import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import LogoLight from '../../images/600px-CyberX_lightmode.png';
import LogoDark from '../../images/600px-CyberX_darkmode.png';
import Cart from '../../images/Cart.svg';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useTheme} from "../../ThemeContext";

const Header: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.totalQuantity);
    const { theme, mode, setMode } = useTheme();

    const logoSrc = theme === 'light' ? LogoLight : LogoDark;

    return (
        <header className='header'>
            <img className='header__logo' src={logoSrc} alt="CyberX" />
            <div className='header__right'>
                <label className="header__theme">
                    <span className="header__theme-label">Theme</span>
                    <select
                        value={mode}
                        onChange={(event) => setMode(event.target.value as 'light' | 'dark' | 'system')}
                        aria-label="Theme"
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System</option>
                    </select>
                </label>
                <NavLink to="/cart">
                    <button className='header__button' aria-label="Open cart">
                        <img src={Cart} alt="Cart" />
                        <div className='header__button-counter'>{cartItems}</div>
                    </button>
                </NavLink>
            </div>
        </header>
    );
};

export default Header;
