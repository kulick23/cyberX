import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { clearCart, updateCartItemQuantity, removeFromCart } from '../../store/cartSlice';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);
    const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleQuantityChange = (id: string, quantity: number) => {
        dispatch(updateCartItemQuantity({ id, quantity }));
    };

    const handleRemoveItem = (id: string) => {
        dispatch(removeFromCart(id));
    };

    return (
        <div className="cart-page">
            <button className="cart-back" onClick={() => navigate('/menu')} aria-label="Back to menu">
                ← Back
            </button>
            <h1>Finish your order</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
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
                                        min="1"
                                    />
                                    <button onClick={() => handleRemoveItem(item.id)}>✖</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <p>Total Amount: ${totalAmount.toFixed(2)}</p>
                        <div className='cart__inputs'>
                            <label>Zone</label>
                            <input
                                type='street'
                            />
                        </div>
                        <div className='cart__inputs'>
                            <label>Table</label>
                            <input
                                type='number'

                            />
                        </div>
                        <div className="cart__summary--buttons">
                        <button className="cart__summary--clear" onClick={handleClearCart}>Clear Cart</button>
                        <button >Order</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
