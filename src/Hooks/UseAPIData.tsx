import { useState, useEffect } from "react";
import axios from "axios";

export function useAPIData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    console.log(`cada cuando se llama la api??`);
    axios
      .get(`https://6244adda7701ec8f72484339.mockapi.io/theory`)
      .then((response) => {
        setAPIData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(`error`);
        console.log(error);
        setLoading(false);
        setError(error);
      });
  },[]);

  return {
    APIData,
    loading,
    error,
  };
}
