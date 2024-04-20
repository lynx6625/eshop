import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './common/App';
import reportWebVitals from './common/reportWebVitals';
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import { AuthProvider } from './common/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <AuthProvider>
    <Routes>
      <Route path="/*" element={ <App /> }>
      </Route>
    </Routes>
    </AuthProvider>
  </BrowserRouter>
</React.StrictMode>,
  );

reportWebVitals();
