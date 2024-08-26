import React, { useContext } from 'react';
import CartContext from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './index.css';

const CartSummary: React.FC = () => {
  const { cartList } = useContext(CartContext);
  const navigate = useNavigate()

  const total = cartList.reduce(
    (acc, eachCartItem) => acc + eachCartItem.price * eachCartItem.quantity,
    0
  );
  const redirectToStepper = () => {
    navigate('/step')
  }
  return (
    <>
      <div className="cart-summary-container">
        <h1 className="order-total-value">
          <span className="order-total-label">Order Total:</span> Rs {total}/-
        </h1>
        <p className="total-items" style={{ fontSize: '18px' }}>{cartList.length} Items in cart</p>
        <button type="button" style={{ fontSize: '20px' }} className="checkout-button d-sm-none" onClick={redirectToStepper}>
          Checkout
        </button>
      </div>
      <button type="button" className="checkout-button d-lg-none" onClick={redirectToStepper}>
        Checkout
      </button>
    </>
  );
};

export default CartSummary;
