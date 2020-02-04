import useSWR from "swr";
import axios from "axios";

export default function useRequest(request, { initialData, ...config } = {}) {
  const { data: response, error, isValidating, revalidate } = useSWR(
    request?.url,
    (url) => fetch(url).then(r => r.json()),
    {
      ...config,
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
}
