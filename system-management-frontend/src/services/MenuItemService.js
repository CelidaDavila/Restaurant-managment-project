import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const REST_API_BASE_URL = `${BASE_URL}/menu-items`;

export const listMenuItems = () => axios.get(REST_API_BASE_URL);
export const createMenuItem = (menuItem) => axios.post(REST_API_BASE_URL, menuItem);
export const getMenuItem = (menuItemId) => axios.get(REST_API_BASE_URL + '/' + menuItemId);
export const updateMenuItem = (menuItemId, menuItem) => axios.put(REST_API_BASE_URL + '/' + menuItemId, menuItem);
export const deleteMenuItem = (menuItemId) => axios.delete(REST_API_BASE_URL + '/' + menuItemId);