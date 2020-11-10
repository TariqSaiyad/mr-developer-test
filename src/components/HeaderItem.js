import React, { useState } from "react"
import MiniCartItem from './MiniCartItem';


const HeaderItem = (props) => {
    let { cartItems, totalItems } = props;

    const [style, setStyle] = useState({ display: 'none' });
    const [toggleCart, setToggleCart] = useState(false);

    //determine if we are on a mobile device.
    let isMobile = window.innerWidth < 1000;

    // Toggles the cart on mobile devices.
    const doToggleCart = () => {
        setToggleCart(!toggleCart); if (toggleCart) {
            setStyle({ display: 'none' })
        } else {
            setStyle({ display: 'block' });
        }
    }


    return (
        <div onMouseLeave={isMobile ? null : e => { setStyle({ display: 'none' }) }}
            onMouseEnter={isMobile ? null : e => { setStyle({ display: 'block' }); }}>
            <p onClick={!isMobile ? null : doToggleCart}>My Cart ({totalItems})</p>
            <div className={'cart-card'} style={style}>
                {/* Temporary fix with Math.random() since we only have one item. */}
                {[...cartItems.keys()].map((e) => <MiniCartItem key={e.name + Math.random()} quantity={cartItems.get(e)} item={e}></MiniCartItem>)}
            </div>
        </div>

    );
}

export default HeaderItem;