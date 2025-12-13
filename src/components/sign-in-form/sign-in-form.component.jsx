import { useState, useContext } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { UserContext } from '../../contexts/user.context';
// the UserContext object will give us back whatever value is passed in for the value
// (value = { currentUser, setCurrentUser})
// -> our value is:  the current user from state (currentUser) + setter function (setCurrentUser)

import {
   createUserDocumentFromAuth,
   signInWithGooglePopup,
   signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
   email: '',
   password: '',
};

const SignInForm = () => {
   const [formFields, setFormFields] = useState(defaultFormFields);
   const { email, password } = formFields; // destructuring of the object formFields;

   // we want to update our currentUser -> destructure the setter function setCurrentUser
   const { setCurrentUser } = useContext(UserContext);

   const resetFormFields = () => setFormFields(defaultFormFields);

   const signInWithGoogle = async () => {
      const { user } = await signInWithGooglePopup(); // we destructure user from the response object
      setCurrentUser(user);
      await createUserDocumentFromAuth(user);
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      try {
         const { user } = await signInAuthUserWithEmailAndPassword(
            email,
            password,
         );
         setCurrentUser(user); // we run the setCurrentUser function whenever the user value comes back
         resetFormFields();
      } catch (error) {
         if (error.code === 'auth/invalid-credential') {
            alert('Incorrect email or password');
         } else {
            console.log(error.code);
         }
         resetFormFields();
      }
   };

   const handleChange = (event) => {
      const { name, value } = event.target;
      setFormFields({ ...formFields, [name]: value });
   };

   return (
      <div>
         <h2>Already have an account?</h2>
         <span>Sign in with your email and password</span>
         <form onSubmit={handleSubmit}>
            <FormInput
               label='Email'
               type='email'
               required
               onChange={handleChange}
               name='email'
               value={email}
            />

            <FormInput
               label='Password'
               type='password'
               required
               onChange={handleChange}
               name='password'
               value={password}
            />
            <div className='buttons-container'>
               <Button type='submit'>Sign In</Button>
               <Button
                  type='button'
                  buttonType='google'
                  onClick={signInWithGoogle}
               >
                  Google Sign In
               </Button>
            </div>
         </form>
      </div>
   );
};

export default SignInForm;
