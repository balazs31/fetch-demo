/**
 * The default authentication strategy
 *
 * @see useAuthStrategyDefault.md for details
 */
import PropTypes from "prop-types";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * Tells if the user is authenticated
   */
  isAuthenticated: PropTypes.bool,
  /**
   * Returns the user object
   */
  user: PropTypes.object,
  /**
   * Defines the login function
   */
  login: PropTypes.func,
  /**
   * Defines the logout function
   */
  logout: PropTypes.func,
  /**
   * The authentication strategy
   */
  strategy: PropTypes.string,
  /**
   * The message in case of an error
   */
  message: PropTypes.string
};

/**
 * Defines the default props
 */
const defaultProps = {
  isAuthenticated: false,
  user: {},
  login: () => {
    console.log("Login");
  },
  logout: () => {
    console.log("Logout");
  },
  strategy: "none",
  message: "Just for demo purposes"
};

/**
 * Displays the component
 */
const useAuthStrategyDefault = props => {
  return defaultProps;
};

useAuthStrategyDefault.propTypes = propTypes;
useAuthStrategyDefault.defaultProps = defaultProps;

export { useAuthStrategyDefault };
