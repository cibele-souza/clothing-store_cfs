import { createContext, useState, useEffect } from 'react';

import {
   onAuthStateChangedListener,
   createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

// actual value you want to access
export const UserContext = createContext({
   currentUser: null,
   // currentUser is an object -> the empty state should be null
   // -> we want to check whether or not we have an user existing object
   // - empty object: evaluate as true (we have an object)
   // - null: evaluate as false -> we know there is no context
   setCurrentUser: () => null,
   // default value of a setter function: empty function that returns null
});

// provider -> is the actual component (functional component)
// On every context that gets built for us, there is a .Provider
// Parameters: value: holds the actual contextual values
export const UserProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState(null);
   const value = { currentUser, setCurrentUser };

   useEffect(() => {
      const unsubscribe = onAuthStateChangedListener((user) => {
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
