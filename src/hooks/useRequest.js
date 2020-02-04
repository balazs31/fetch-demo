import useSWR from "swr";
import axios from "axios";
import PropTypes from "prop-types";

/**
 * Defines the prop types
 */
const propTypes = {
  /**
   * `useAsync` specific options
   *
   * @see https://docs.react-async.com/api/interfaces#useasync-hook
   */
  options: PropTypes.object,
  url: PropTypes.string
};

/**
 * Defines the default props
 *
 * - These options are mandatory
 */
const defaultProps = {
  url: null,
  options: {
    /**
     * The fetcher function
     */
    promiseFn: () => console.log("Fetcher function for useDataAsync"),
    /**
     * Params for the fetcher function, if any
     */
    promiseFnParams: {},
    /**
     * The default / initial data to be returned
     */
    initialData: "Loading ...."
  }
};

/**F
 * Returns the initial value
 *
 * - Used in `useData` for mapping `initialValue`
 */
const getInitialValue = props => {
  const { options } = props;
  const { initialValue } = options;

  return initialValue;
};

/**
 * Returns the params to call the hook
 *
 * - Used in `useData` for mapping the params of the hook
 */
const getHookProps = props => {
  const { options, url } = props;

  return { options: options, url };
};

const useRequest = props => {
  const { url, options } = props;
  const { initialData } = options;
  const { data: response, error, isValidating, revalidate } = useSWR(
    url,
    url => fetch(url).then(r => r.json()),
    {
      ...options,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      initialData: initialData && {
        status: 200,
        statusText: "InitialData",
        headers: {},
        data: initialData
      }
    }
  );

  return {
    data: response,
    response,
    error,
    isValidating,
    revalidate
  };
};

export default useRequest;
export {
  propTypes as useRequestPropTypes,
  defaultProps as useRequestcDefaultProps,
  getHookProps as useRequestGetHookProps,
  getInitialValue as useRequestGetInitialValue
};
