import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '', // Initial notification message
  reducers: {
    setNotification(state, action) {
      return action.payload; // Set the notification message
    },
    clearNotification() {
        return '';
    }
  }
});

export const { setNotification, clearNotification } = notificationSlice.actions;

// Improved action creator for setting a notification with a timeout
export const setNotificationWithTimeout = (message, timeInSeconds) => {
    return async (dispatch) => {
      dispatch(setNotification(message));
      setTimeout(() => {
        dispatch(clearNotification());
      }, timeInSeconds * 1000);
    };
  };

export default notificationSlice.reducer;
