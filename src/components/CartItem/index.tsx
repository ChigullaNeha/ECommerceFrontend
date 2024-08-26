import React, { useContext } from 'react';
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import CartContext from '../../context/CartContext';

import './index.css';

interface CartItem {
    id: number; 
    quantity: number;
    brand: string;
    imageUrl: string;
    price: number;
    productId: string;
    rating: number;
    title: string;
    description: string;
    availability: string;
}


const CartItem  = ({ cartItemDetails }) => {
  const {
    id, title, brand, quantity, price, imageUrl
  } = cartItemDetails;

  const {
    removeCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
  } = useContext(CartContext);

  const onClickDecrement = () => decrementCartItemQuantity(id);
  const onClickIncrement = () => incrementCartItemQuantity(id);
  const onRemoveCartItem = () => removeCartItem(id);

  const totalPrice = price * quantity;

  return (
    <li className="cart-item" style={{width: '600px'}}>
      <img className="cart-product-image" src={imageUrl} style={{height: '120px', width: '120px'}}  alt={title} />
      <div className="cart-item-details-container">
        <div className="cart-product-title-brand-container">
          <p className="cart-product-title" style={{ fontSize: '24px' }}>{title}</p>
          <p className="cart-product-brand" style={{ fontSize: '20px' }}>by {brand}</p>
        </div>
        <div className="cart-quantity-container">
          <button
            type="button"
            className="quantity-controller-button"
            data-testid="minus"
            onClick={onClickDecrement}
          >
            <BsDashSquare color="#52606D" size={12} />
          </button>
          <p className="cart-quantity">{quantity}</p>
          <button
            type="button"
            className="quantity-controller-button"
            data-testid="plus"
            onClick={onClickIncrement}
          >
            <BsPlusSquare color="#52606D" size={12} />
          </button>
        </div>
        <div className="total-price-remove-container">
          <p className="cart-total-price">Rs {totalPrice}/-</p>
          <button
            className="remove-button"
            type="button"
            onClick={onRemoveCartItem}
          >
            Remove
          </button>
        </div>
      </div>
      <button
        className="delete-button"
        type="button"
        onClick={onRemoveCartItem}
        data-testid="remove"
      >
        <AiFillCloseCircle color="#616E7C" size={20} />
      </button>
    </li>
  );
};

export default CartItem;
