import React from 'react';
// import { useSelector } from 'react-redux';
import { useNotification } from '../context/NotificationContext';


const Notification = () => {
  // const notification = useSelector((state) => state.notification);
  const { notification } = useNotification();

  if (!notification) {
    return null;
  }


  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification ? "block" : "none"
  };
  return (
    <div style={style}>
      {notification}
    </div>
  )
};

export default Notification