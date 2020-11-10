import React, { useState } from 'react';
import './App.css';
import HeaderItem from './components/HeaderItem';
import SizeSelection from './components/SizeSelection';
import Product from './constants/Product';
import Modal from 'react-modal';


const customStyles = {
  content: {
    top: '50%',
    color: 'red',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

const App = () => {


  // This is used to select the size of item.
  const [selectedSize, setSize] = useState(null);

  // This map stores our products and the quantity for each.
  const [cart, setCart] = useState(new Map());


  //This keeps track of the total items for easy access.
  const [totalItems, setTotalItems] = useState(0);

  //Hook for error modal
  const [isModal, setModal] = useState(false);


  // When the user adds to cart, we first check if a size is selected.
  function addToCart() {
    if (!selectedSize) {
      setModal(!isModal);
      return;
    };
    let newP = {
      "name": Product.name,
      "image": Product.image,
      "price": Product.price,
      "description": Product.description,
      "size": selectedSize
    }

    // let cartList = [...cart.keys()];
    //Since we are adding a product object to our cart, the map cannot check for equality unless it uses
    // deep equality. So we need to check through the map if the item name and size match with any other in the map.
    let itemFound = false;
    [...cart.keys()].map((e) => {
      if (e.name === newP.name && e.size === newP.size) {
        setCart(cart.set(e, cart.get(e) + 1));
        itemFound = true;
        return;
      }
    });

    // if no matching items are found, add a new key to the map, with quantity of 1.
    if (!itemFound) {
      setCart(cart.set(newP, 1));
    }
    setTotalItems(totalItems + 1);
  };

  return (
    <div className={'App'}>
      <Modal
        isOpen={isModal}
        onRequestClose={() => setModal(!isModal)}
        style={customStyles}> Error! Please select a size</Modal>
      <header >
        <HeaderItem totalItems={totalItems} cartItems={cart}></HeaderItem>

      </header>
      <div className={'container'}>
        <div className="image-container">
          <img src={Product.image} alt={Product.name}></img>
        </div>
        <div className="product-detail">

          <h2 className='product-detail title'>{Product.name}</h2>
          <hr className="divider" />
          <h4 className={'product-detail price'}>${Product.price.toFixed(2)}</h4>
          <hr className="divider" />
          <p className={'product-detail description'}>{Product.description}</p>

          <p className="product-detail size">
            SIZE
            <span className='required'>*</span>
            <span className="bold-text">{selectedSize}</span>
          </p>

          <SizeSelection sizes={['S', 'M', 'L']} selectedSize={selectedSize} setSize={setSize}></SizeSelection>
          <button onClick={addToCart} className={'cart-button'}>ADD TO CART</button>
        </div>
      </div>
    </div>

  );
}


export default App;
