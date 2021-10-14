import React from 'react';
function Paginator({
  currentPage,
  totalPages,
  totalJokes,
  loading,
  pageLimit,
  handleClick,
  setJokesPerPage,
}) {
  const getPageLabel = () => {
    if (currentPage > totalPages) {
      return `Showing 0 - 0 of ${totalJokes}`;
    } else {
      return `Showing ${(currentPage - 1) * pageLimit + 1} - ${
        currentPage * pageLimit
      } of ${totalJokes}`;
    }
  };

  return (
    <div className="paginator-wrapper">
      <div className="rows-page-wrapper">
        <span>Jokes per Page</span>
        <select
          value={pageLimit}
          onChange={(e) => setJokesPerPage(e.target.value)}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="30">30</option>
        </select>
      </div>
      <div className="btn-wrapper">
        <button
          onClick={() => handleClick({ type: 'prev' })}
          disabled={currentPage == 1 || loading}
        >
          Previous
        </button>
        <button
          onClick={() => handleClick({ type: 'next' })}
          disabled={currentPage == totalPages || loading}
        >
          Next
        </button>
      </div>

      <span className="lbl-wrapper">{getPageLabel()}</span>
    </div>
  );
}
export default Paginator;
