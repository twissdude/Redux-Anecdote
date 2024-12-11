import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

// export const getAll = async () => {
//     const response = await axios.get(baseUrl);
//     return response.data;
// };

// export const createAnecdote = async (newAnecdote) => {
//     const response = await axios.post(baseUrl, newAnecdote);
//     return response.data;
//   };

//   export const updateAnecdote = async (id, updatedAnecdote) => {
//     const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote);
//     return response.data;
//   };

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const createAnecdote = async (newAnecdote) => {
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

export const updateAnecdoteVotes = async (id, updatedAnecdote) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote);
  return response.data;
};

export default {getAnecdotes, createAnecdote, updateAnecdoteVotes};
// export default {getAll, createAnecdote, updateAnecdote};