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
  console.error(event);
};

/**
 * Displays the component
 */
const Dashboard = props => {
  const [inputs, setInputs] = useState({
    title: ""
  });
  const { title } = inputs;
  const [request, setRequest] = useState(
    `http://hn.algolia.com/api/v1/search?page=1&query=asd`
  );

  const { error, data, revalidate, isValidating } = useRequest({
    url: request,
    options: { onSuccess: onSuccess, onError: onError }
  });

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
    setRequest(`http://hn.algolia.com/api/v1/search?page=1&query=${title}`);
  };

  const handleSecondButton = event => {
    event.preventDefault();
    revalidate();
  };

  const handleTriggerError = event => {
    event.preventDefault();
    setRequest(`http://hn.algolia.com/api/v1/search?page=1&qery=${title}`);
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
