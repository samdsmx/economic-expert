import { useState, useEffect } from "react";
import axios from "axios";

export function useAPIData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState({});
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://economic-expert-default-rtdb.firebaseio.com/data.json`)
      .then((response) => {
        setAPIData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError(error);
      });
  },[refresh]);

  return {
    APIData,
    loading,
    error,
    setRefresh,
  };
}
