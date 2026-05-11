import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const REST_API_BASE_URL = `${BASE_URL}/inventory`;

export const listInventory = () => axios.get(REST_API_BASE_URL);
export const createInventoryItem = (item)  => axios.post(REST_API_BASE_URL, item);
export const getInventoryItem = (itemId) => axios.get(REST_API_BASE_URL + '/' + itemId);
export const updateInventoryItem = (itemId, item) => axios.put(REST_API_BASE_URL + '/' + itemId, item);
export const deleteInventoryItem = (itemId) => axios.delete(REST_API_BASE_URL + '/' + itemId);