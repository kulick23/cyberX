import React from 'react';
import './Cart.css';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../hooks/useCart';

const Cart: React.FC = () => {
    const { t } = useTranslation();
    const {
        cartItems,
        totalAmount,
        handleClearCart,
        handleQuantityChange,
        handleRemoveItem,
        goBack,
        quantityMin,
    } = useCart();

    return (
        <div className="cart-page">
            <button className="cart-back" onClick={goBack} aria-label={t('cart.back')}>
                ← {t('cart.back')}
            </button>
            <h1>{t('cart.title')}</h1>
            {cartItems.length === 0 ? (
                <p>{t('cart.empty')}</p>
            ) : (
                <div>
                    <ul className="cart-items">
                        {cartItems.map(item => (
                            <li key={item.id} className="cart-item">
                                <div className="cart-item-left">
                                    <div className="cart-item-image-container">
                                        <img src={item.img} alt={item.name} className="cart-item-image" />
                                    </div>
                                    <h3 className="cart-item-name">{item.name}</h3>
                                </div>
                                <div className="cart-item-total">
                                    <p>${item.quantity * item.price}</p>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                        min={quantityMin}
                                    />
                                    <button onClick={() => handleRemoveItem(item.id)}>✖</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <p>{t('cart.total')}: ${totalAmount.toFixed(2)}</p>
                        <div className='cart__inputs'>
                            <label>{t('cart.street')}</label>
                            <input
                                type='street'
                            />
                        </div>
                        <div className='cart__inputs'>
                            <label>{t('cart.house')}</label>
                            <input
                                type='number'

                            />
                        </div>
                        <div className="cart__summary--buttons">
                        <button className="cart__summary--clear" onClick={handleClearCart}>{t('cart.clear')}</button>
                        <button>{t('cart.order')}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
