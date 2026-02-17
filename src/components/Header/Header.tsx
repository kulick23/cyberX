import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import Cart from '../../images/Cart.svg';
import { useTranslation } from 'react-i18next';
import { useHeader } from '../../hooks/useHeader';
import { ROUTES } from '../../constants/routes';

const Header: React.FC = () => {
    const { t } = useTranslation();
    const { cartItems, mode, setMode, logoSrc } = useHeader();

    return (
        <header className='header'>
            <img className='header__logo' src={logoSrc} alt="CyberX" />
            <div className='header__right'>
                <label className="header__theme">
                    <span className="header__theme-label">{t('header.theme')}</span>
                    <select
                        value={mode}
                        onChange={(event) => setMode(event.target.value as 'light' | 'dark' | 'system')}
                        aria-label={t('header.theme')}
                    >
                        <option value="light">{t('header.light')}</option>
                        <option value="dark">{t('header.dark')}</option>
                        <option value="system">{t('header.system')}</option>
                    </select>
                </label>
                <NavLink to={ROUTES.CART}>
                    <button className='header__button' aria-label={t('header.cart')}>
                        <img src={Cart} alt="Cart" />
                        <div className='header__button-counter'>{cartItems}</div>
                    </button>
                </NavLink>
            </div>
        </header>
    );
};

export default Header;
