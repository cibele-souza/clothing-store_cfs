import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
   createAuthUserWithEmailAndPassword,
   createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import './sign-up-form.styles.scss';

const defaultFormFields = {
   displayName: '',
   email: '',
   password: '',
   confirmPassword: '',
};

const SignUpForm = () => {
   const [formFields, setFormFields] = useState(defaultFormFields);
   const { displayName, email, password, confirmPassword } = formFields; // destructuring of the object formFields;

   const resetFormFields = () => setFormFields(defaultFormFields);

   const handleSubmit = async (event) => {
      event.preventDefault();

      // check if the password is at least 6 characters (Firebase default requirement)
      if (password.length < 6) {
         alert('password should be at least 6 characters');
         return;
      }

      // confirm that the two passwords matches
      if (password !== confirmPassword) {
         alert('passwords do not match');
         return;
      }

      // confirm that we've authenticated the user with email and password
      try {
         const { user } = await createAuthUserWithEmailAndPassword(
            email,
            password,
         );
         // create a user document from what createAuthUserWithEmailAndPassword returns + pass the displayName
         await createUserDocumentFromAuth(user, { displayName });
         // we can't centralize this function -> we have to keep it here because we need the displayName

         // clear up the form
         resetFormFields();
      } catch (error) {
         if (error.code === 'auth/email-already-in-use') {
            alert('Cannot create user, email already in use');
         } else {
            console.log('user creation encountered an error', error);
         }
      }
   };

   const handleChange = (event) => {
      const { name, value } = event.target;
      // we will update one input at a time -> use the spread operator, to spread all the fields from the object,
      // and just update the appropriate field that is being trigged now => [name]:value
      setFormFields({ ...formFields, [name]: value });
   };

   return (
      <div className='sign-up-container'>
         <h2>Don't have an account?</h2>
         <span>Sign up with your email and password</span>
         <form onSubmit={handleSubmit}>
            {/* We are going to put this code into form-input.component.jsx (to generalize the form input component)
            But we'll keep the initial code here since it has some explanation about this functionality
            
            <label>Display Name</label>
            <input
               type='text'
               required
               onChange={handleChange}
               name='displayName'
               value={displayName} // the value that gets typed in should be the value that,
               // in turn, we actually display in the input -> circular direction:
               // -> the value I want inside of this input should be the value I'm passing you
               // This way, the value from the state is the value that is shown in the input
               // -> when the user types -> it triggers onChange functions -> the value gets
               // pushed into our state -> the state updates the visual of the form
            /> */}

            <FormInput
               label='Display Name'
               type='text'
               required
               onChange={handleChange}
               name='displayName'
               value={displayName} // the value that gets typed in should be the value that,
               // in turn, we actually display in the input -> circular direction:
               // -> the value I want inside of this input should be the value I'm passing you
               // This way, the value from the state is the value that is shown in the input
               // -> when the user types -> it triggers onChange functions -> the value gets
               // pushed into our state -> the state updates the visual of the form
            />

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

            <FormInput
               label='Confirm Password'
               type='password'
               required
               onChange={handleChange}
               name='confirmPassword'
               value={confirmPassword}
            />

            <Button type='submit'>Sign Up</Button>
         </form>
      </div>
   );
};

export default SignUpForm;
