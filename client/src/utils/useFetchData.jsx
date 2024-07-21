import { useCallback, useEffect, useState } from "react";

const hostUrl = import.meta.env.VITE_API_URL;

const queryList = {
  chargingStation: {
    endPoint: "charging-stations?",
    defaultQueryOptions: {},
  },
};

function useFetchData(selectedEndpoint, queryOptions = {}) {
  const [fetchedData, setfetchedData] = useState({});
  const [isLoading, setIsloading] = useState(true);

  const queryString = useCallback(() => {
    const finalQueryOptions = {
      ...queryList[selectedEndpoint]?.defaultQueryOptions,
      ...queryOptions,
    };
    return (
      queryList[selectedEndpoint].endPoint +
      Object.entries(finalQueryOptions)
        .map(([key, value]) => (value !== "?" ? `${key}=${value}` : key))
        .join("&")
    );
  }, [selectedEndpoint, queryOptions]);

  useEffect(() => {
    try {
      fetch(`${hostUrl}/api/${queryString()}`)
        .then((response) => response.json())
        .then((data) => {
          setfetchedData(data);
          setIsloading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }, [queryString()]);

  return { fetchedData, isLoading };
}

export default useFetchData;
