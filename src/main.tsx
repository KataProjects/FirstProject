import App from '@app/App';
import { withProviders } from '@app/providers/withProviders';

import { createRoot } from 'react-dom/client';

import './index.css';

createRoot(document.getElementById('root')!).render(withProviders(<App />));
