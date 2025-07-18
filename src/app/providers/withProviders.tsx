import React, { type FC, StrictMode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '@app/store';

export const WithProviders: FC <{ children: React.ReactNode }> = ({ children }) => (
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  </StrictMode>
);
