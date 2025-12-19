import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import App from './App.jsx';
import UserProvider from './contexts/user.provider.jsx';
import CategoriesProvider from './contexts/categories.provider.jsx';
import CartProvider from './contexts/cart.provider.jsx';

import './index.css';

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <BrowserRouter>
         <UserProvider>
            <CategoriesProvider>
               <CartProvider>
                  <App />
               </CartProvider>
            </CategoriesProvider>
         </UserProvider>
      </BrowserRouter>
   </StrictMode>,
);

// All the components inside the UserProvider tag will be able to access its context
