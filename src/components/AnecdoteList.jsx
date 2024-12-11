import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { voteAnecdoteAsync } from '../reducers/anecdoteReducer';
// import { setNotificationWithTimeout } from '../reducers/notificationReducer';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, updateAnecdoteVotes } from '../services/anecdotes';
import { useNotification } from '../context/Notification';

const AnecdoteList = () => {

  // const anecdotes = useSelector(state => {
  //   // Ensure correct state path for anecdotes and filter
  //   const filteredAnecdotes = state.anecdotes.filter(anecdote =>
  //     anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
  //   );
  //   return filteredAnecdotes.sort((a, b) => b.votes - a.votes);
  // });

  const queryClient = useQueryClient();
  const {dispatch} = useNotification();
   // Fetch anecdotes
   const { data: anecdotes, isLoading, isError } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  });

  // Mutation for voting
  const voteMutation = useMutation({
    mutationFn: ({ id, updatedAnecdote }) => updateAnecdoteVotes(id, updatedAnecdote),
    onSuccess: (updatedAnecdote) => {
      // Update the anecdote cache
      queryClient.setQueryData(['anecdotes'], (oldAnecdotes) =>
        oldAnecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      );
      dispatch({ type: 'SET_NOTIFICATION', payload: `You voted for '${updatedAnecdote.content}'` });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    }
  });

  if (isLoading) {
    return <div>Loading anecdotes...</div>;
  }

  if (isError) {
    return <div>Anecdote service not available due to problems in the server</div>;
  }

  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    voteMutation.mutate({ id: anecdote.id, updatedAnecdote });
  };

  // const anecdotes = useSelector(state => 
  //   [...state.anecdotes].sort((a, b) => b.votes - a.votes)
    
  // );

  //   const dispatch = useDispatch();
  
  //   const handleVote = (anecdote) => {
  //     const updatedVotes = anecdote.votes + 1;
  //     dispatch(voteAnecdote({ id: anecdote.id, votes: updatedVotes }));
  //     dispatch(setNotificationWithTimeout(`You voted for '${anecdote.content}'`, 5));
  //   };
  
    return (
      <div>
        <ul>  
        {anecdotes.map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
        </ul>
      </div>
    );
  };
  
  export default AnecdoteList;