import axios from 'axios';

export const fetchPizzas = (category, sortBy) => async (dispatch) => {
  dispatch(setLoaded(false));
  const response = await axios.get(
    `http://localhost:3001/pizzas?${
      category !== null ? `category=${category}` : ''
    }&_sort=${sortBy.type}&_order=${sortBy.order}`,
  );
  const { data } = response;
  dispatch(setPizzas(data));
};

export const setLoaded = (payload) => ({
  type: 'SET_LOADED',
  payload,
});

export const setPizzas = (items) => {
  return {
    type: 'SET_PIZZAS',
    payload: items,
  };
};
