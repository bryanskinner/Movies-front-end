// import { useEffect, useState } from "react";

// // const fetch = require('node-fetch');

// const DashBoard = () => {
//   const [searchParam, setSearchParam] = useState("");

//   useEffect(() => {
//     console.log(searchParam)
//     // const fetch = require('node-fetch');

//     const url = `https://api.themoviedb.org/3/search/movie?api_key=95abec4cfb4e6e4b50c9c280a38a3e96&query=${searchParam}`;
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWFiZWM0Y2ZiNGU2ZTRiNTBjOWMyODBhMzhhM2U5NiIsInN1YiI6IjY1MjRkOGU3NDQ3ZjljMDEwMDQ4NWMzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MjHbULjQVhbBRL7CROE3pNZo4fXHvApfbowfeHXY38U",
//       },
//     };

//     fetch(url, options)
//       .then((res) => res.json())
//       .then((json) => console.log(json))
//       .catch((err) => console.error("error:" + err));
//   }, [searchParam]);

//   return <div>Dashboard
//     <input value={searchParam}onChange={(e) => {setSearchParam(e.target.value)}}/>
//   </div>;
// };

// export default DashBoard;


import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [searchParam, setSearchParam] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieRatings, setMovieRatings] = useState({});
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    if (searchParam) {
      const apiKey = import.meta.env.VITE_API_KEY;
      // const apiKey = "95abec4cfb4e6e4b50c9c280a38a3e96";
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchParam}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setSearchResults(data.results.slice(0, 3)))
        .catch((err) => console.error("error:" + err));
    } else {
      setSearchResults([]);
    }
  }, [searchParam]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setSelectedRating(movieRatings[movie.id] || 0);
  };

  const handleRateMovie = () => {
    if (selectedMovie) {
      setMovieRatings((prevRatings) => ({
        ...prevRatings,
        [selectedMovie.id]: selectedRating,
      }));
    }
  };

  const ratingOptions = [];
  for (let i = 1; i <= 10; i++) {
    ratingOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <div className="dashboard">
      <div className="search-container">
        <input
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          placeholder="Search for a movie"
          className="search-bar"
        />
        <div className="movie-results">
          {searchResults.map((result) => (
            <div key={result.id} className="movie-item" onClick={() => handleSelectMovie(result)}>
              <img
                src={`https://image.tmdb.org/t/p/w185${result.poster_path}`}
                alt={`${result.title} Poster`}
                className="movie-image"
              />
              <span className="movie-title">{result.title}</span>
            </div>
          ))}
        </div>
      </div>
      {selectedMovie && (
        <div className="selected-movie">
          <h2>Selected Movie: {selectedMovie.title}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w342${selectedMovie.poster_path}`}
            alt={`${selectedMovie.title} Poster`}
            className="selected-movie-image"
          />
          <p className="movie-summary">{selectedMovie.overview}</p>
          <div className="rating-container">
            <span>Rate this movie:</span>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(parseInt(e.target.value, 10))}
            >
              {ratingOptions}
            </select>
            <button className="rate-button" onClick={handleRateMovie}>
              Rate
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
