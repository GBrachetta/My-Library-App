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

const composerService = {
  createComposer,
};

export default composerService;
