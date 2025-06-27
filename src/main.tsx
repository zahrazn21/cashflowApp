import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './components/ui/AppContext'; // 👈 حتما ایمپورت کن

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider> {/* ✅ کل اپ داخل context */}
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
