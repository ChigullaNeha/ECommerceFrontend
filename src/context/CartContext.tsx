import React, { ReactNode } from 'react'

export interface CartItem {
  id: string
  title: string
  brand: string
  price: number
  imageUrl: string
  quantity: number
}

export interface CartContextType {
  cartList: CartItem[]
  removeAllCartItems: () => void
  addCartItem: (item: CartItem) => void
  removeCartItem: (id: string) => void
  incrementCartItemQuantity: (id: string) => void
  decrementCartItemQuantity: (id: string) => void
}

const CartContext = React.createContext<CartContextType>({
  cartList: [],
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
