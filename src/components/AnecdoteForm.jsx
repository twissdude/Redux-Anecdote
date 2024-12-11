import React, {useState} from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../services/anecdotes';
import { useNotification } from '../context/Notification';
// import { useDispatch } from 'react-redux';
// import { createAddAnecdoteAction } from '../reducers/anecdoteReducer';
// import { setNotificationWithTimeout } from '../reducers/notificationReducer';


const AnecdoteForm = () => {
  // const dispatch = useDispatch();

  // const addNewAnecdote = async (event) => {
  //   event.preventDefault();
  //   const content = event.target.anecdote.value;
  //   event.target.anecdote.value = '';  // Clear the input field after submission


  const queryClient = useQueryClient();
  const { dispatch } = useNotification();
  const [content, setContent] = useState('');

  const mutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      // Update the anecdote cache after a successful mutation
      queryClient.setQueryData(['anecdotes'], (oldAnecdotes) => [...oldAnecdotes, newAnecdote]);

      // Display notification
      dispatch({ type: 'SET_NOTIFICATION', payload: `You created '${newAnecdote.content}'` });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);

      onError: (error) => {
        // Display error notification
        dispatch({ type: 'SET_NOTIFICATION', payload: `Error: ${error.response.data.error}` });
        setTimeout(() => {
          dispatch({ type: 'CLEAR_NOTIFICATION' });
        }, 5000);
      }
    }
  });


  const handleSubmit = (event) => {
    event.preventDefault();
    if (content.trim().length < 5) {
      alert('Anecdote content must be at least 5 characters long.');
      return;
    }
    mutation.mutate({ content, votes: 0 });
    setContent('');
  };
    

    // if (content.trim()) {  
    //   // const newAnecdote = {
    //   //   id: Math.floor(Math.random() * 100000).toString(),  // Simple random ID generator
    //   //   content,
    //   //   votes: 0
    //   // }; 
    // dispatch(createAddAnecdoteAction(content));
    // dispatch(setNotificationWithTimeout(`You created '${content}'`, 5000));
    // }
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create new</h2>
      <input 
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter anecdote"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AnecdoteForm;
