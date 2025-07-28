import store from '@app/store';

import React, { type FC, StrictMode } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

export const WithProviders: FC<{ children: React.ReactNode }> = ({ children }) => (
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  </StrictMode>
);
