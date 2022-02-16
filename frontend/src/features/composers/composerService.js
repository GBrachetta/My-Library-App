import axios from 'axios';

const API_URL = '/api/composers/';

// Create new composer
const createComposer = async (composerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, composerData, config);

  return response.data;
};

// Get composers
const getComposers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get single composer
const getComposer = async (composerId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}${composerId}`, config);

  return response.data;
};

const composerService = {
  createComposer,
  getComposers,
  getComposer,
};

export default composerService;
