/**
 * A hook for working with data
 *
 * @see useData.md
 */
import React from "react";
import PropTypes from "prop-types";

/**
 * Imports a strategy / library.
 *
 * - This can be replaced anytime
 */
import useDataAsync, {
  useDataAsyncPropTypes,
  useDataAsyncDefaultProps,
  useDataAsyncGetHookProps,
  useDataAsyncGetInitialValue
} from "./strategies/useDataAsync";
import useRequest, { useRequestGetInitialValue, useRequestGetHookProps } from "../useRequest";

/**
 * Defines the prop types
 */
const propTypes = PropTypes.shape(useDataAsyncPropTypes);

/**
 * Defines the default props
 */
const defaultProps = useDataAsyncDefaultProps;

/**
 * Implements the hook
 */
const useData = props => {
  /**
   * Prepares the props
   *
   * - This step has to be performed to map a strategy to the hook code below
   */
  // const initialValue = useDataAsyncGetInitialValue(props);
    const initialValue = useRequestGetInitialValue(props);

  // const hookProps = useDataAsyncGetHookProps(props);
  const hookProps = useRequestGetHookProps(props);

  /**
   * Queries the API
   */
  // const { data, error, reload, cancel } = useDataAsync(hookProps);
  const { data, error, revalidate: reload} = useRequest(hookProps)
  /**
   * Returns default data while real data is loaded from the API
   */
  if (data === undefined) {
    return { data: initialValue, error, reload };
  }

  /**
   * Returns the error
   */
  if (error) {
    return { data: null, error, reload };
  }

  /**
   * Returns data and functions
   */
  return { data: data, reload };
};

useData.propTypes = propTypes;
useData.defaultProps = defaultProps;

export default useData;
export {
  propTypes as useDataPropTypes,
  defaultProps as useDataDefaultProps,
  useRequestGetHookProps as getUseDataHookProps,
  useRequestGetInitialValue as getUseDataInitialValue
};
