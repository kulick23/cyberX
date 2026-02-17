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
    const { theme, toggleTheme } = useTheme();

    const logoSrc = theme === 'light' ? LogoLight : LogoDark;

    return (
        <header className='header'>
            <img className='header__logo' src={logoSrc} alt="CyberX" />
            <div className='header__right'>
                <NavLink to="/cart">
                    <button className='header__button' aria-label="Open cart">
                        <img src={Cart} alt="Cart" />
                        <div className='header__button-counter'>{cartItems}</div>
                    </button>
                </NavLink>
                <button onClick={toggleTheme}>
                    {theme === 'light' ? 'Dark' : 'Light'} Mode
                </button>
            </div>
        </header>
    );
};

export default Header;
