import axios from 'axios';

const BASE_URL = 'http://localhost:5001';

export const fetchPRs = async () => {
  const response = await axios.get(`${BASE_URL}/api/prs`);
  return response.data;
};

export const fetchPRDetails = async (prId) => {
  const response = await axios.get(`${BASE_URL}/api/pr/${prId}`);
  return response.data;
};

export const submitReview = async (prId, review) => {
  const response = await axios.post(`${BASE_URL}/api/review`, { prId, review });
  return response.data;
};
