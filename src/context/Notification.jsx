import React, { createContext, useReducer, useContext } from 'react';


// Initial state for the notification
const initialState = '';

// Reducer function to manage notification state
const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.payload;
        case 'CLEAR_NOTIFICATION':
            return '';
        default:
            return state;
    }
};

// Create Context
const NotificationContext = createContext();

// Context Provider
export const NotificationProvider = ({ children }) => {
    const [notification, dispatch] = useReducer(notificationReducer, initialState);
  
    return (
      <NotificationContext.Provider value={{ notification, dispatch }}>
        {children}
      </NotificationContext.Provider>
    );
  };
  
  // Custom Hook to Use Notification Context
  export const useNotification = () => useContext(NotificationContext);
  