import React from 'react';
import './Menu_Element.css';

interface MenuElementProps {
    img: string;
    name: string;
    price: number;
    desc: string;
    onOpen: () => void;
}

const MenuElement: React.FC<MenuElementProps> = (props) => {
    const trimmedDesc = props.desc.split(' ').slice(0, 18).join(' ');
    return (
        <button className='menuelement' onClick={props.onOpen} type="button">
            <img src={props.img} alt={props.name} />
            <div className='menuelement__textblock'>
                <div className='menuelement__text'>
                    <h3>{props.name}</h3>
                    <p> &#36; {props.price.toFixed(2)} USD</p>
                </div>
                <p>{trimmedDesc}{props.desc.split(' ').length > 18 ? '...' : ''}</p>
            </div>
        </button>
    );
};

export default MenuElement;
