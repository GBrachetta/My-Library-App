/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import composerReducer from '../features/composers/composerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    composer: composerReducer,
  },
});
