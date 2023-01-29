import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './pages/_app';

const container = document.querySelector('#app');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
