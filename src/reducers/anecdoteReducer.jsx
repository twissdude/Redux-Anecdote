// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

// const reducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   return state
// }

// export default reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

export const fetchAnecdotes = createAsyncThunk(
  'anecdotes/fetchAll',
  async () => {
    const anecdotes = await anecdoteService.getAll();
    return anecdotes;
  }
);

// Create a new anecdote in the backend
export const addAnecdoteAsync = createAsyncThunk(
  'anecdotes/addAnecdote',
  async (content) => {
    const newAnecdote = { content, votes: 0 };
    const createdAnecdote = await anecdoteService.createAnecdote(newAnecdote);
    return createdAnecdote;
  }
);

// Update votes for an anecdote in the backend
export const voteAnecdoteAsync = createAsyncThunk(
  'anecdotes/voteAnecdote',
  async ({ id, votes }) => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(id, { votes });
    return updatedAnecdote;
  }
);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // voteAnecdote(state, action) {
    //   const id = action.payload;
    //   const anecdoteToVote = state.find(anecdote => anecdote.id === id);
    //   if (anecdoteToVote) {
    //     anecdoteToVote.votes += 1;
    //   }
    // },
    // addAnecdote(state, action) {
    //   state.push(action.payload);
    // }
  },
    extraReducers: (builder) => {
      builder
      .addCase(fetchAnecdotes.fulfilled, (state, action) => {
        return action.payload; // Replace the state with fetched anecdotes
      })
      .addCase(addAnecdoteAsync.fulfilled, (state, action) => {
        state.push(action.payload); // Add new anecdote to the state
      })
      .addCase(voteAnecdoteAsync.fulfilled, (state, action) => {
        const updatedAnecdote = action.payload;
        return state.map(anecdote =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        );
      });
  }

});
  


// Action creator for voting
export const createVoteAction = (id) => {
  return {
    type: anecdoteSlice.actions.voteAnecdote.type,
    payload: id
  };
};


// Action creator for adding a new anecdote
export const createAddAnecdoteAction = (content) => {
  return {
    type: anecdoteSlice.actions.addAnecdote.type,
    payload: {
      content,
      id: Math.floor(Math.random() * 100000).toString(),  // Simple random ID generator
      votes: 0
    }
  };
};

export const {voteAnecdote, addAnecdote} = anecdoteSlice.actions;
export default anecdoteSlice.reducer;