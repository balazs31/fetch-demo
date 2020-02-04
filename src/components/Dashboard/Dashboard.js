import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useRequest from "../../hooks/useRequest";
import queryString from "query-string";
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
  margin: "1.25em",
  display: "flex"
}));

const onSuccess = event => {
  console.log(event);
};

const onError = event => {
  console.error(event)

}

/**
 * Displays the component
 */
const Dashboard = props => {
  const [inputs, setInputs] = useState({
    title: "",
    email: "p.schinkel+5@vacat.nl",
    name: "",
    password: "test123"
  });
  const { title, email, password, name } = inputs;
  const [request, setRequest] = useState({
    url: `http://hn.algolia.com/api/v1/search?page=1&query=asd`
  });
  const [loginRequest, setLoginRequest] = useState(null);
  const [registerRequest, setReqisterRequest] = useState(null);

  const { response, error, data, revalidate, isValidating } = useRequest(request, { onSuccess: onSuccess, onError: onError });

 

  const {
    error: loginError,
    data: loginData,
    revalidate: loginRevalidate,
    isValidating: loginIsValidating,
    response: loginResponse
  } = useRequest(loginRequest, { onSuccess: onSuccess, onError: onError });
  const {
    error: registerError,
    data: registerData,
    revalidate: registerRevalidate,
    isValidating: registerIsValidating
  } = useRequest(registerRequest);


  const handleChange = event => {
    const {
      target: { value, name }
    } = event;

    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  };

  if (error) {
  }

  const handleSubmit = event => {
    event.preventDefault();
    const { title } = inputs;
    setRequest({
      url: `http://hn.algolia.com/api/v1/search?page=1&query=${title}`
    });
  };

  const handleSecondButton = event => {
    event.preventDefault();
    revalidate();
  };

  const handleTriggerError = event => {
    event.preventDefault();
    setRequest({
      url: `http://hn.algolia.com/api/v1/search?page=1&qery=${title}`
    });
  };

  const handleLogin = event => {
    event.preventDefault();

    const encodedUser = queryString.stringify({ email, password });
    setLoginRequest({
      url: `http://api.finsterdata.com/v1/login?${encodedUser}`
    });
  };

  const handleRegister = event => {
    event.preventDefault();
  };

  return (
    <Container className="Dashboard">
      {isValidating && <div>Loading...</div>}
      <form style={{ display: "flex", flexDirection: "column", width: "50%" }}>
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleSecondButton}>Revalidate</button>
        <button onClick={handleTriggerError}>Trigger error</button>

        <div>
          {data &&
            data.hits &&
            data.hits.length &&
            data.hits.map(hit => {
              return (
                <div key={hit.created_at_i}>
                  {hit.title}
                  <hr />
                </div>
              );
            })}
        </div>

        {error && <div>{JSON.stringify(error)}</div>}
      </form>
      <form style={{ display: "flex", flexDirection: "column", width: "50%" }}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={name}
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
        <button onClick={handleRegister}>Register</button>

        <div>
          {loginData && <div>{JSON.stringify(loginData)}</div>}

          {loginError && <div>{JSON.stringify(loginError)}</div>}
          {registerData && <div>{JSON.stringify(registerData)}</div>}
          {registerError && <div>{JSON.stringify(registerError)}</div>}
        </div>
      </form>
    </Container>
  );
};

Dashboard.propTypes = propTypes;
Dashboard.defaultProps = defaultProps;

export default Dashboard;
export {
  propTypes as DashboardPropTypes,
  defaultProps as DashboardDefaultProps
};
