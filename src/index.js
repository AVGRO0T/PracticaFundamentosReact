import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import storage from './clientApi/tokenStorage';
import { setAuthorizationHeader } from './clientApi/client';
import { AuthContextProvider } from './components/userLogin/userState';

const accessToken = storage.get('auth');
setAuthorizationHeader(accessToken);
console.log(accessToken);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <AuthContextProvider isInitiallyLogged={!!accessToken}>
        <App />
      </AuthContextProvider>
  
);
