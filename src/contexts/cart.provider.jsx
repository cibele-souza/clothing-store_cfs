import { useState, useEffect } from 'react';

import CartContext from './cart.context';

// Helper function to add to find inside of my existing array any cart items
// that matchwa the ID of the product I'm trying to add to the cart:
// if YES -> add to the quantity
// if NO -> add product to the cart items array (with quantity = 1)
const addCartItem = (cartItems, productToAdd) => {
   // find if cartItems contains productToAdd
   const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id,
   );

   // if found, increment quantity
   if (existingCartItem) {
      return cartItems.map((cartItem) =>
         cartItem.id === productToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
      );
   }

   // return new array with modified cartItems / new cart item
   return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
   // find the cart item to remove
   const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === cartItemToRemove.id,
   );

   // check if quantity is equal to 1
   // if YES -> remove the item from the cart
   if (existingCartItem.quantity === 1) {
      return cartItems.filter(
         (cartItem) => cartItem.id !== cartItemToRemove.id,
      );
   }
   // if NO -> decrease the quantity by 1
   return cartItems.map((cartItem) =>
      cartItem.id === cartItemToRemove.id
         ? { ...cartItem, quantity: cartItem.quantity - 1 }
         : cartItem,
   );
};

const CartProvider = ({ children }) => {
   const [isCartOpen, setIsCartOpen] = useState(false);
   const [cartItems, setCartItems] = useState([]);
   const [cartCount, setCartCount] = useState(0);

   useEffect(() => {
      const newCartCount = cartItems.reduce(
         (total, cartItem) => total + cartItem.quantity,
         0,
      );
      setCartCount(newCartCount);
   }, [cartItems]);
   // dependency of useEffect = [cartItems] -> means that it will run everytime anything in cartItems change

   // function that triggers whenever the user click on 'Add item to cart'
   const addItemToCart = (productToAdd) => {
      setCartItems(addCartItem(cartItems, productToAdd));
   };

   const removeItemToCart = (cartItemToRemove) => {
      setCartItems(removeCartItem(cartItems, cartItemToRemove));
   };

   const value = {
      isCartOpen,
      setIsCartOpen,
      cartItems,
      addItemToCart,
      removeItemToCart,
      cartCount,
   };

   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
