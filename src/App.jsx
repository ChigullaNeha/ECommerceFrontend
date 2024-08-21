import  { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AllProducts from './components/AllProducts';
import Cart from './components/Cart';
import Home from './components/Home';
import SignupPage from './components/SignupPage';
import RegistrationSucess from './components/RegistrationSucess';
import ProductItemDetails from './components/ProductItemDetails';
import CartContext from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

const App = () => {
  const [cartList, setCartList] = useState([]);

  const removeAllCartItems = () => {
    setCartList([]);
  };

  const incrementCartItemQuantity = (id) => {
    setCartList(prevCartList =>
      prevCartList.map(eachCartItem => {
        if (eachCartItem.id === id) {
          const updatedQuantity = eachCartItem.quantity + 1;
          return { ...eachCartItem, quantity: updatedQuantity };
        }
        return eachCartItem;
      })
    );
  };

  const decrementCartItemQuantity = (id) => {
    setCartList(prevCartList => {
      const productObject = prevCartList.find(eachCartItem => eachCartItem.id === id);
      if (productObject && productObject.quantity > 1) {
        return prevCartList.map(eachCartItem => {
          if (eachCartItem.id === id) {
            const updatedQuantity = eachCartItem.quantity - 1;
            return { ...eachCartItem, quantity: updatedQuantity };
          }
          return eachCartItem;
        });
      } else {
        return prevCartList.filter(eachCartItem => eachCartItem.id !== id);
      }
    });
  };

  const removeCartItem = (id) => {
    setCartList(prevCartList => 
      prevCartList.filter(eachCartItem => eachCartItem.id !== id)
    );
  };

  const addCartItem = (product) => {
    setCartList(prevCartList => {
      const productObject = prevCartList.find(eachCartItem => eachCartItem.id === product.id);
      if (productObject) {
        return prevCartList.map(eachCartItem => {
          if (eachCartItem.id === product.id) {
            const updatedQuantity = eachCartItem.quantity + product.quantity;
            return { ...eachCartItem, quantity: updatedQuantity };
          }
          return eachCartItem;
        });
      } else {
        return [...prevCartList, product];
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
      }}
    >
       <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/reg-success" element={<RegistrationSucess />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:id" element={<ProductItemDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </Router>
    </CartContext.Provider>
  );
};

export default App;
