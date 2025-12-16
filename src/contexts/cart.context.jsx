import { createContext } from 'react';

const CartContext = createContext({
   isCartOpen: false,
   setIsCartOpen: () => {},
   cartItems: [],
   addItemToCart: () => {},
   removeItemFromCart: () => {},
   cartCount: 0,
});

export default CartContext;
