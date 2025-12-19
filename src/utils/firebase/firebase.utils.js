// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
   getAuth,
   signInWithPopup,
   GoogleAuthProvider,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   onAuthStateChanged,
} from 'firebase/auth';

// Import the frunctions you need for your database
import {
   getFirestore,
   doc,
   getDoc,
   setDoc,
   collection,
   writeBatch,
   query,
   getDocs,
} from 'firebase/firestore';

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

// Create the database instance
export const db = getFirestore();

// Create a method to upload data into Firestore
export const addCollectionAndDocuments = async (
   collectionKey,
   objectsToAdd,
) => {
   const collectionRef = collection(db, collectionKey);
   const batch = writeBatch(db);

   objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
   });

   await batch.commit();
   console.log('done');
};

// Retrieving data from the Firestore database
export const getCategoriesAndDocuments = async () => {
   const collectionRef = collection(db, 'categories');
   const q = query(collectionRef);

   const querySnapshot = await getDocs(q);
   // => getDocs is the asynchronous ability to fetch the documents snapshots that we want
   // they are now all encapsulated under querySnapshot
   // querySnapshot.docs => gives an array of all the individual documents inside / the snapshots are the actual data themselves
   // we can reduce off this array to end up with an object (data structure that we need to populate the application):
   const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      // destructure the values of the data of the doc snapshot:
      const { title, items } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
   }, {});

   return categoryMap;
};

// -> Function that will take the data we are getting from the authentication service and store it inside of Firestore
// additionalInfo: if we sign-up with email/password, we are not going to have userName that comes from userAuth
// we will use the object additionalInfo to pass the displayName ourselves -> it will overwrithe the null value that
// might come if we authenticate using email/password
export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
   if (!userAuth) return;

   // is there an existing document reference?
   // Reference: special type of object that Firestore uses when talking about actual instance of a document model
   const userDocRef = doc(db, 'users', userAuth.uid);

   const userSnapshot = await getDoc(userDocRef);

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
            ...additionalInfo,
         });
      } catch (error) {
         console.log('error creating the user', error.message);
      }
   }

   // true, user data exists -> return userDocRef
   return userDocRef;
};

// Creating the user with email and password -> create an authenticated user inside of our Firebase Authentication tab
export const createAuthUserWithEmailAndPassword = async (email, password) => {
   if (!email || !password) return;
   return await createUserWithEmailAndPassword(auth, email, password);
};

// Signing in with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
   if (!email || !password) return;
   return await signInWithEmailAndPassword(auth, email, password);
};

// Signing out user
export const signOutUser = async () => await signOut(auth);

// Observer listener function
export const onAuthStateChangedListener = (callback) =>
   onAuthStateChanged(auth, callback);
