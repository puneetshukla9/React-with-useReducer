export const BASE_URL = 'https://icanhazdadjoke.com';
export const initialState = {
  loading: true,
  jokes: [],
  totalJokes: 0,
  totalPages: 0,
  currentPage: 1,
  pageLimit: 5,
  query: '',
  error: false,
};
export const reducer = (state, action) => {
  switch (action.type) {
    case 'Loading':
      return { ...state, loading: action.payload };
    case 'SUCCESS':
      return {
        ...state,
        jokes: action.payload.jokes,
        totalJokes: action.payload.totalJokes,
        totalPages: action.payload.totalPages,
        loading: false,
      };
    case 'LOAD_PAGE':
      return {
        ...state,
        currentPage: action.payload.loadPage,
        loading: false,
      };
    case 'PAGE_LIMIT':
      return {
        ...state,
        pageLimit: action.payload.pageLimit,
      };
    case 'SEARCH_JOKES':
      return {
        ...state,
        query: action.payload.query,
      };
    case 'ERROR':
      return { ...state, error: action.payload.error, loading: false };
    default:
      return initialState;
  }
};
