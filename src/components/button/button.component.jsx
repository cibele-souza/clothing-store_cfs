import './button.styles.scss';

// In the application we have 3 different types of button styles:
// - default (black -> white)
// - inverted (white -> black)
// - Google Sign In (blue -> black)
// For that, we can create a variable to select the button style we want:
const BUTTON_TYPE_CLASSES = {
   google: 'google-sign-in',
   inverted: 'inverted',
};
// => this allows us to use a more readable kind of input for button type,
// but render the style we want for this button type

const Button = ({ children, buttonType, ...otherProps }) => {
   return (
      <button
         className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
         {...otherProps}
      >
         {children}
      </button>
   );
};

export default Button;
