import { createContext } from 'react';

// actual value you want to access
const UserContext = createContext({
   currentUser: null,
   // currentUser is an object -> the empty state should be null
   // -> we want to check whether or not we have an user existing object
   // - empty object: evaluate as true (we have an object)
   // - null: evaluate as false -> we know there is no context
   setCurrentUser: () => null,
   // default value of a setter function: empty function that returns null
});

export default UserContext;
