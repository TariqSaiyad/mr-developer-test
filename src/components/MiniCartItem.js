import React from "react"

const MiniCartItem = (props) => {
    let { item, quantity } = props;

    return (
        <div className="mini-item">
            <img src={item.image} alt={item.name}></img>
            <div>
                <p className='mini-product title'>{item.name}</p>
                <p className='mini-product title' style={{ color: 'black' }}>
                    {quantity}x <span className={'mini-product price'}>${item.price.toFixed(2)}</span>
                </p>
                <p className='mini-product title'>Size: {item.size}</p>

            </div>
        </div>

    );
}

export default MiniCartItem;