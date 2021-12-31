import React from "react";

const useFetch = (url) => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(null);

  const request = React.useCallback(async () => {
    let response;
    let json;
    try {
      setError(null);
      setLoading(true);
      response = await fetch(url);
      json = await response.json();
      console.log(response);
      if (response.ok === false) throw new Error(json.message);
    } catch (err) {
      // se houver algum erro ele vai setar meu data como null, então no finaly ele vai ta null.
      json = null;
      setError(err);
    } finally {
      setData(json);
      setLoading(null);
      console.log(json);
      return { response, json };
    }
  }, [url]);

  return {
    data,
    error,
    loading,
    request,
  };
};

export default useFetch;
