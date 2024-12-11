import React from 'react';
// import { useDispatch } from 'react-redux';
// import { fetchAnecdotes } from './reducers/anecdoteReducer';
// import AnecdoteForm from './components/AnecdoteForm';
// import AnecdoteList from './components/AnecdoteList';
// import Filter from './components/Filter';
// import Notification from './components/Notification';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';

const App = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchAnecdotes());
  // }, [dispatch]);


  return (
    <div>
      <h2>Anecdotes</h2>
      {/* <Notification />
      <Filter />*/}
      <AnecdoteList />
      <AnecdoteForm /> 
      {/* <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>{anecdote.content}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default App;