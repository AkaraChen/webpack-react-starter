import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './pages/_app';
import { StrictMode } from 'react';

const container = document.querySelector('#app');
const root = createRoot(container!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
