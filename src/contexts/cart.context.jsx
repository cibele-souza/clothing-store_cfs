import { createContext } from 'react';

const CartContext = createContext({
   isCartOpen: false,
   setIsCartOpen: () => {},
});

export default CartContext;
