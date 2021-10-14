import React from 'react';

function Jokes({ jokes, startNumber }) {
  return (
    jokes.length && (
      <div className="joke-wrapper">
        <ol start={startNumber}>
          {jokes.map((joke) => {
            return <li key={joke.id}>{joke.joke}</li>;
          })}
        </ol>
      </div>
    )
  );
}
export default Jokes;
