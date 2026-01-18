import axios from "axios";
const BASE = "https://cybercrimebackend.onrender.com/api";

export const getCases = () => axios.get(`${BASE}/cases`);
export const addCase = (data) => axios.post(`${BASE}/cases`, data);
export const updateStatus = (id, status) => axios.put(`${BASE}/cases/${id}/status?status=${status}`);
export const uploadEvidence = (data) => axios.post(`${BASE}/evidence/upload`, data);
export const deleteCase = (id) => axios.delete(`${BASE}/cases/${id}`);
export const getCase = (id) => axios.get(`${BASE}/cases/${id}`);
export const getEvidences = (caseId) => axios.get(`${BASE}/evidence/${caseId}`);
export const deleteEvidence = (id) => axios.delete(`${BASE}/evidence/${id}`);
export const filterCases=(id)=>axios.filterCases(`${BASE}/cases/${id}`);