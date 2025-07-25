import axios from 'axios';

const API = axios.create({ baseURL: 'https://loan-application-kk-1.onrender.com/api/v1' });

export const createLoan = (data) => API.post('/loans', data);
export const makePayment = (loanId, data) => API.post(`/loans/${loanId}/payments`, data);
export const getLedger = (loanId) => API.get(`/loans/${loanId}/ledger`);
export const getCustomerOverview = (customerId) => API.get(`/customers/${customerId}/overview`);
