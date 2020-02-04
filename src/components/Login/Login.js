import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {useAuth}  from '../../hooks'


/**
 * Defines the prop types
 */
const propTypes = {};

/**
 * Defines the default props
 */
const defaultProps = {};

/**
 * Styles the component container
 */
const Container = styled("div")(props => ({
  border: "1px solid",
  padding: "1.25em",
  margin: "1.25em"
}));

/**
 * Displays the component
 */
const Login = props => {
  const [inputs, setInputs] = useState({
    email: "p.schinkel+5@vacat.nl",
    password: "test123"
  }); 
  const { login } = useAuth();
  const { email, password } = inputs;

  const handleChange = event => {
    const {
      target: { value, name }
    } = event;

    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  };

  const handleLogin = event => {
    event.preventDefault();

    login({email, password})
  };

  return <Container className="Login">
     <form style={{ display: "flex", flexDirection: "column", width: "50%" }}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
       
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
        <button onClick={handleLogin}>Login</button>

      </form></Container>;
};

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default Login;
export { propTypes as LoginPropTypes, defaultProps as LoginDefaultProps };
