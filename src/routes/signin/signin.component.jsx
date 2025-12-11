import {
   auth,
   signInWithGooglePopup,
   signInWithGoogleRedirect,
   createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

const SignIn = () => {
   useEffect(() => {
      async function handleRedirectResult() {
         console.log('Checking for redirect result');
         try {
            const response = await getRedirectResult(auth);
            console.log('Redirect response:', response);
            // getRedirectResult returns null if there was no redirect sign-in
            if (!response) {
               console.log('No redirect result found');
               return;
            }
            console.log('user from redirect:', response.user);
            const userDocRef = await createUserDocumentFromAuth(response.user);
            console.log('user document created:', userDocRef);
         } catch (err) {
            console.error('Error handling redirect sign-in:', err);
         }
      }
      handleRedirectResult();
   }, []);

   const logGoogleUser = async () => {
      const { user } = await signInWithGooglePopup(); // we destructure user from the response object
      const userDocRef = await createUserDocumentFromAuth(user);
   };

   const handleRedirectSignIn = async () => {
      console.log('🔄 About to redirect to Google...');
      try {
         await signInWithGoogleRedirect();
         console.log(
            '⚠️ This line should NOT appear because page will redirect',
         );
      } catch (err) {
         console.error('❌ Error starting redirect:', err);
      }
   };

   return (
      <div>
         <h1>Sign In Page</h1>
         <button onClick={logGoogleUser}>Sign in with Google Popup</button>
         <button onClick={signInWithGoogleRedirect}>
            Sign in with Google Redirect
         </button>
      </div>
   );
};

export default SignIn;
