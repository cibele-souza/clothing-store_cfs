import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import App from './App.jsx';
import { UserProvider } from './contexts/user.context.jsx';

import './index.css';

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <BrowserRouter>
         <UserProvider>
            <App />
         </UserProvider>
      </BrowserRouter>
   </StrictMode>,
);

// All the components inside the UserProvider tag will be able to access its context
