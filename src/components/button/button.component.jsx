import {
   BaseButton,
   GoogleSignInButton,
   InvertedButton,
} from './button.styles';

// In the application we have 3 different types of button styles:
// - base (black -> white)
// - inverted (white -> black)
// - Google Sign In (blue -> black)
// For that, we can create a variable to select the button style we want:
export const BUTTON_TYPE_CLASSES = {
   base: 'base',
   google: 'google-sign-in',
   inverted: 'inverted',
};
// => this allows us to use a more readable kind of input for button type,
// but render the style we want for this button type

// Once using Styled Components, we need to create a function to select the
// type of button to be rendered
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
   ({
      [BUTTON_TYPE_CLASSES.base]: BaseButton,
      [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
      [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
   })[buttonType];

const Button = ({ children, buttonType, ...otherProps }) => {
   const CustomButton = getButton(buttonType);
   return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;

// We will need then to import BUTTON_TYPE_CLASSES in the components that uses a button
// See sign-in-form.component.jsx for an example
