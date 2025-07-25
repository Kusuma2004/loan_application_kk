import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/v1' });

export const createLoan = (data) => API.post('/loans', data);
export const makePayment = (loanId, data) => API.post(`/loans/${loanId}/payments`, data);
export const getLedger = (loanId) => API.get(`/loans/${loanId}/ledger`);
export const getCustomerOverview = (customerId) => API.get(`/customers/${customerId}/overview`);
