import React from 'react'
import ReactDOM from 'react-dom/client'
// import { createStore } from 'redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { Provider } from 'react-redux'
// import store from './store'
import App from './App'
// import reducer from './reducers/anecdoteReducer'
import { NotificationProvider } from '../src/context/Notification';
// const store = createStore(reducer)

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationProvider>
    <App />
  </NotificationProvider>
);