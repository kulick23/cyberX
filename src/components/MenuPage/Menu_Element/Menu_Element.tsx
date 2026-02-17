import React from 'react';
import './Menu_Element.css';
import { useTranslation } from 'react-i18next';

interface MenuElementProps {
    img: string;
    name: string;
    price: number;
    desc: string;
    onOpen: () => void;
}

const MenuElement: React.FC<MenuElementProps> = (props) => {
    const { t } = useTranslation();
    const trimmedDesc = props.desc.split(' ').slice(0, 18).join(' ');
    return (
        <button className='menuelement' onClick={props.onOpen} type="button">
            <img src={props.img} alt={props.name} />
            <div className='menuelement__textblock'>
                <div className='menuelement__text'>
                    <h3>{props.name}</h3>
                    <p> &#36; {props.price.toFixed(2)} {t('common.usd')}</p>
                </div>
                <p>{trimmedDesc}{props.desc.split(' ').length > 18 ? '...' : ''}</p>
            </div>
        </button>
    );
};

export default MenuElement;
