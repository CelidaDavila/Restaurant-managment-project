import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const REST_API_BASE_URL = `${BASE_URL}/sales`;

export const listSales = () => axios.get(REST_API_BASE_URL);
export const createSale = (sale) => axios.post(REST_API_BASE_URL, sale);
export const getSale = (saleId) => axios.get(REST_API_BASE_URL + '/' + saleId);
export const deleteSale = (saleId) => axios.delete(REST_API_BASE_URL + '/' + saleId);