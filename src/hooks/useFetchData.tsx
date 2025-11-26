import { useEffect, useState } from "react";
import axios from "axios";
import type { IfetchedData } from "../types/fetchedData.interface";

const useFetchData = () => {
  const [fetchedData, setFetchedData] = useState<IfetchedData[]>([]);
  useEffect(() => {
    //'/data.json'
    axios.get(`/data.json?t=${Date.now()}`).then((res) => setFetchedData(res.data));
  }, []);

  return fetchedData;
};

export default useFetchData;
