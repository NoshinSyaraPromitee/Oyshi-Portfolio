import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/tokens.css';
import './styles/ui.css';
import './styles/cards.css';
import './styles/layout.css';
import './styles/hero.css';
import './styles/sections.css';
import './styles/showreel.css';
import './styles/shoots.css';
import './styles/headshots.css';
import './styles/makeup.css';
import './styles/trio.css';
import './styles/awards.css';
import './styles/loader.css';
import './styles/filmstrip.css';
import './styles/press.css';

const Admin = lazy(() => import('./admin/Admin'));
const isAdmin = window.location.hash.startsWith('#/admin');

window.addEventListener('hashchange', () => {
  if (window.location.hash.startsWith('#/admin') !== isAdmin) window.location.reload();
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isAdmin ? (
      <Suspense fallback={null}>
        <Admin />
      </Suspense>
    ) : (
      <App />
    )}
  </React.StrictMode>
);
