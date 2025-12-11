// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
   getAuth,
   signInWithRedirect,
   signInWithPopup,
   GoogleAuthProvider,
} from 'firebase/auth';

// Import the frunctions you need for your database
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: 'AIzaSyBavnqNhZKljPmUJpE4k5XxqCd0GF7LjFc',
   authDomain: 'clothing-store-be34f.firebaseapp.com',
   projectId: 'clothing-store-be34f',
   storageBucket: 'clothing-store-be34f.firebasestorage.app',
   messagingSenderId: '906526849404',
   appId: '1:906526849404:web:0640f3ad4542f1eea48cf9',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
// There are different providers available: Google, Facebook, GitHub, etc. -> we instantiate the provider with classes

googleProvider.setCustomParameters({
   prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
   signInWithPopup(auth, googleProvider);

// Setting up the sign in with Redirect
export const signInWithGoogleRedirect = () =>
   signInWithRedirect(auth, googleProvider);

// Create the database instance
export const db = getFirestore();

// -> Function that will take the data we are getting from the authentication service and store it inside of Firestore
export const createUserDocumentFromAuth = async (userAuth) => {
   // is there an existing document reference?
   // Reference: special type of object that Firestore uses when talking about actual instance of a document model
   const userDocRef = doc(db, 'users', userAuth.uid);

   console.log(userDocRef);

   const userSnapshot = await getDoc(userDocRef);
   console.log(userSnapshot);
   console.log(userSnapshot.exists());

   // does user date exists ?
   // false, user data doesn't exist -> create / set the document with the data from userAuth in my collection
   if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
         await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
         });
      } catch (error) {
         console.log('error creating the user', error.message);
      }
   }

   // true, user data exists -> return userDocRef
   return userDocRef;
};
