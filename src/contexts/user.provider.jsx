import { useState, useEffect } from 'react';
import UserContext from './user.context';

import {
   onAuthStateChangedListener,
   createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

// provider -> is the actual component (functional component)
// On every context that gets built for us, there is a .Providercdclothig
// Parameters: value: holds the actual contextual values
const UserProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState(null);
   const value = { currentUser, setCurrentUser };

   useEffect(() => {
      const unsubscribe = onAuthStateChangedListener(async (user) => {
         if (user) {
            await createUserDocumentFromAuth(user);
         }
         setCurrentUser(user); // we'll either get an user (if user signed in) or null (when user signs out)
      });
      return unsubscribe;
   }, []);

   // => this provider is essentially allowing any of its child components to access the values inside of its useState
   // we want to be able to call this setter (setCurrentUser) and get the value anywhere inside of the component
   // tree that is nested within this actual provider value
   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
