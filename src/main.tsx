import { createRoot } from 'react-dom/client';
import App from '@app/App';
import { withProviders } from '@app/providers/withProviders';
import './index.css';

createRoot(document.getElementById('root')!).render(withProviders(<App />));