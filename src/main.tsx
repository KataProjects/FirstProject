import App from '@app/App';
import { WithProviders } from '@app/providers';

import { createRoot } from 'react-dom/client';
import '@ant-design/v5-patch-for-react-19';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <WithProviders>
    <App />
  </WithProviders>,
);
