import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const REST_API_BASE_URL = `${BASE_URL}/roles`;

export const listRoles = () => axios.get(REST_API_BASE_URL);