import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { SnackbarProvider } from 'notistack';
import { GoogleOAuthProvider } from "@react-oauth/google";
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <SnackbarProvider autoHideDuration={2500} maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <App />
        </SnackbarProvider>
      </GoogleOAuthProvider>
    </Provider>
  </>
);

