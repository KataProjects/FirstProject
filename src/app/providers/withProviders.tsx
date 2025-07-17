import store from '@app/store/store';

import { type ReactNode, StrictMode } from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

export const withProviders = (component: ReactNode) => {
  return (
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>{component}</BrowserRouter>
      </Provider>
    </StrictMode>
  );
};
