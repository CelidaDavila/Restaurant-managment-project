import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const REST_API_BASE_URL = `${BASE_URL}/suppliers`;

export const listSuppliers = () => axios.get(REST_API_BASE_URL);
export const createSupplier = (supplier) => axios.post(REST_API_BASE_URL, supplier);
export const getSupplier = (supplierId) => axios.get(REST_API_BASE_URL + '/' + supplierId);
export const updateSupplier = (supplierId, supplier) => axios.put(REST_API_BASE_URL + '/' + supplierId, supplier);
export const deleteSupplier = (supplierId) => axios.delete(REST_API_BASE_URL + '/' + supplierId); 