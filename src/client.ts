import axios from "axios";

const client = axios.create({
  baseURL: "https://www.thecocktaildb.com/api/json/v1/1",
});

export const fetchData = async (url: string) => {
  const result = await client.get(url);

  return result.data;
};

export default client;
