import React, { useMemo, useState } from 'react';
import './Menu.css';
import MenuElement from './Menu_Element/Menu_Element';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addToCart } from '../../store/cartSlice';
import { useAuth } from '../AuthProvider';

const categories = ['Dessert', 'Dinner', 'Breakfast'];

interface MenuItem {
    id: string;
    name: string;
    desc: string;
    price: number;
    img: string;
    category: string;
}

const Menu: React.FC = () => {
    const [visible, setVisible] = useState<number>(6);
    const [activeCategory, setActiveCategory] = useState<string>(categories[1]);
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state: RootState) => state.menu);
    const { isAuthenticated } = useAuth();

    const handleSeeMore = () => {
        setVisible(prevVisible => prevVisible + 6);
    };


    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
        setVisible(6);
    };

    const filteredItems = useMemo(
        () => items.filter((item) => item.category === activeCategory),
        [items, activeCategory]
    );

    const updateCart = (item: { id: string, name: string, quantity: number, price: number, img: string }) => {
        if (!isAuthenticated()) {
            alert('You must be logged in to add items to the cart.');
            return;
        }
        dispatch(addToCart(item));
    };

    const openItem = (item: MenuItem) => {
        setSelectedItem(item);
        setQuantity(1);
    };

    const closeItem = () => setSelectedItem(null);

    const addSelectedToCart = () => {
        if (!selectedItem) return;
        if (quantity <= 0) return;
        updateCart({ ...selectedItem, quantity });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading menu: {error}</p>;

    const MenuItems = filteredItems
        .slice(0, visible)
        .map((item) => (
            <MenuElement
                key={item.id}
                name={item.name}
                desc={item.desc}
                price={item.price}
                img={item.img}
                onOpen={() => openItem(item as MenuItem)}
            />
        ));

    return (
        <div className='menu'>
            <h1>Browse our menu</h1>
            <p>
                Use our menu to place an order online, or{' '}
                <a href="tel:+3706535678">phone</a> our club
                <br /> to place a pickup order. Fast and fresh food.
            </p>
            <div className='menu__buttons'>
                {categories.map((category) => (
                    <button
                        key={category}
                        className={activeCategory === category ? '' : 'menu__buttons--button'}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className='menu__elements'>{MenuItems}</div>
            {filteredItems.length > visible && (
                <button className='menu__button' onClick={handleSeeMore}>
                    See more
                </button>
            )}
            {selectedItem && (
                <div className="menu__overlay" onClick={closeItem}>
                    <div className="menu__sheet" onClick={(e) => e.stopPropagation()}>
                        <button className="menu__sheet-close" onClick={closeItem} type="button">
                            ✕
                        </button>
                        <div className="menu__sheet-media">
                            <img src={selectedItem.img} alt={selectedItem.name} />
                        </div>
                        <div className="menu__sheet-content">
                            <div className="menu__sheet-header">
                                <h2>{selectedItem.name}</h2>
                                <p className="menu__sheet-price">$ {selectedItem.price.toFixed(2)}</p>
                            </div>
                            <p className="menu__sheet-desc">
                                {selectedItem.desc}
                            </p>
                            <div className="menu__sheet-actions">
                                <div className="menu__qty">
                                    <button
                                        type="button"
                                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setQuantity((q) => q + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button type="button" onClick={addSelectedToCart}>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Menu;
