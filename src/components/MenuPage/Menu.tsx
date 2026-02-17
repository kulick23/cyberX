import React from 'react';
import './Menu.css';
import MenuElement from './Menu_Element/Menu_Element';
import { useTranslation } from 'react-i18next';
import { useMenu } from '../../hooks/useMenu';
import { PHONE_NUMBER } from '../../constants/app';

const Menu: React.FC = () => {
    const { t } = useTranslation();
    const {
        loading,
        error,
        visible,
        activeCategory,
        selectedItem,
        quantity,
        filteredItems,
        handleSeeMore,
        handleCategoryClick,
        openItem,
        closeItem,
        addSelectedToCart,
        setQuantity,
        increaseQty,
        decreaseQty,
        categories,
        quantityMin,
    } = useMenu();

    if (loading) return <p>{t('menu.loading')}</p>;
    if (error) return <p>{t('menu.error')} {error}</p>;

    const MenuItems = filteredItems
        .slice(0, visible)
        .map((item) => (
            <MenuElement
                key={item.id}
                name={item.name}
                desc={item.desc}
                price={item.price}
                img={item.img}
                onOpen={() => openItem(item)}
            />
        ));

    return (
        <div className='menu'>
            <h1>{t('menu.title')}</h1>
            <p>
                {t('menu.descriptionPrefix')}{' '}
                <a href={`tel:${PHONE_NUMBER}`}>{t('menu.phone')}</a>{' '}
                {t('menu.descriptionSuffix')}
            </p>
            <div className='menu__buttons'>
                {categories.map((category) => (
                    <button
                        key={category.id}
                        className={activeCategory === category.value ? '' : 'menu__buttons--button'}
                        onClick={() => handleCategoryClick(category.value)}
                    >
                        {t(category.i18nKey)}
                    </button>
                ))}
            </div>
            <div className='menu__elements'>{MenuItems}</div>
            {filteredItems.length > visible && (
                <button className='menu__button' onClick={handleSeeMore}>
                    {t('menu.seeMore')}
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
                                <p className="menu__sheet-price">
                                    $ {selectedItem.price.toFixed(2)} {t('common.usd')}
                                </p>
                            </div>
                            <p className="menu__sheet-desc">
                                {selectedItem.desc}
                            </p>
                            <div className="menu__sheet-actions">
                                <div className="menu__qty">
                                    <button
                                        type="button"
                                        onClick={decreaseQty}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        min={quantityMin}
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(quantityMin, Number(e.target.value)))}
                                    />
                                    <button
                                        type="button"
                                        onClick={increaseQty}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const ok = addSelectedToCart();
                                        if (ok === false) {
                                            alert(t('menu.authRequired'));
                                        }
                                    }}
                                >
                                    {t('menu.addToCart')}
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
