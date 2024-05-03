const BASE_URL = 'https://dummyjson.com';

export const apiGet = async (url) => {
  const response = await fetch(url);
  const body = await response.json();
  return body;
};

export const getProducts = () => apiGet(`${BASE_URL}/products`);

export default apiGet;
