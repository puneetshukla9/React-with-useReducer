import React, { useState, useEffect, useReducer } from 'react';
import Jokes from './components/Jokes';
import axios from 'axios';
import Search from './components/Search';
import Paginator from './components/Paginator';
import Loader from './components/Loader';
import { BASE_URL, reducer, initialState } from './utils/config';
import './style.css';

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'Loading', payload: true });
    axios
      .get(
        `${BASE_URL}/search?term=${state.query}&limit=${state.pageLimit}&page=${state.currentPage}`,
        {
          headers: {
            Accept: 'application/json',
          },
        }
      )
      .then(({ data }) => {
        dispatch({
          type: 'SUCCESS',
          payload: {
            jokes: data.results,
            totalJokes: data.total_jokes,
            totalPages: data.total_pages,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: 'ERROR',
          payload: {
            error: true,
          },
        });
      });
  }, [state.currentPage, state.pageLimit, state.query]);

  const fetchJokes = (pageEvent) => {
    if (pageEvent.type === 'next' && state.currentPage < state.totalPages) {
      dispatch({
        type: 'LOAD_PAGE',
        payload: { loadPage: state.currentPage + 1 },
      });
    } else if (pageEvent.type === 'prev' && state.currentPage > 1) {
      dispatch({
        type: 'LOAD_PAGE',
        payload: { loadPage: state.currentPage - 1 },
      });
    }
  };

  const loadJokes = () => {
    if (state.error) {
      return <div className="alert-danger">Error fetching data</div>;
    }
    if (state.jokes.length) {
      const startNumber = (state.currentPage - 1) * state.pageLimit + 1;
      return <Jokes jokes={state.jokes} startNumber={startNumber} />;
    }
    return <h3>No data found</h3>;
  };

  const setJokesPerPage = (pageLimit) =>
    dispatch({ type: 'PAGE_LIMIT', payload: { pageLimit: pageLimit } });

  const setQueryText = (searchText) =>
    dispatch({ type: 'SEARCH_JOKES', payload: { query: searchText } });

  return (
    <div>
      <h2>Random Jokes</h2>
      <Search setQueryText={setQueryText} />
      {!state.error && (
        <Paginator
          handleClick={fetchJokes}
          currentPage={state.currentPage}
          totalJokes={state.totalJokes}
          pageLimit={state.pageLimit}
          totalPages={state.totalPages}
          loading={state.loading}
          setJokesPerPage={setJokesPerPage}
        />
      )}

      {state.loading ? <Loader /> : loadJokes()}
    </div>
  );
}
