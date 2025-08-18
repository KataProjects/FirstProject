import App from '@app/App';
import { WithProviders } from '@app/providers';

import { createRoot } from 'react-dom/client';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <WithProviders>
    <App />
  </WithProviders>,
);
