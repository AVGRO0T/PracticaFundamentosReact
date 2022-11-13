import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import storage from './clientApi/tokenStorage';
import { setAuthorizationHeader } from './clientApi/client';
import { AuthContextProvider } from './components/userLogin/userState';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/normalize.css'
import './styles/reset.css'
import './styles/sections.css'
const accessToken = storage.get('auth');
setAuthorizationHeader(accessToken);
console.log(accessToken);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Router>
    <AuthContextProvider isInitiallyLogged={!!accessToken}>
      <App />
    </AuthContextProvider>
  </Router>
</React.StrictMode>,
);
