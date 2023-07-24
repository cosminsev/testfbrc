import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { fetchOMDBDataByTitle } from '../omdbservice/OmdbServiceSlice'


const OMDBMovieSearch = ({ onMovieSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const dispatch = useDispatch();

  const moviesData = useSelector((state) => state.omdb.search);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchMovies = () => {

    dispatch(fetchOMDBDataByTitle(searchTerm));

  };

  const handleMovieSelect = (selectedMovie) => {
    onMovieSelect(selectedMovie.imdbID);
  };

  return (
    <div>
      <h3>Movie Search</h3>
      <input type="text" value={searchTerm} onChange={handleSearchChange} />
      <Button variant="primary" onClick={searchMovies}>Search</Button>
      <StyledUnorderedList>
        {moviesData?.map((movie) => (
          <StyledListItem key={movie.imdbID} onClick={() => handleMovieSelect(movie)}>
            {movie.Title} ({movie.Year})
          </StyledListItem>
        ))}
      </StyledUnorderedList>
      <Button variant="secondary">Load More - not implemented</Button>
    </div>
  );
};

const StyledUnorderedList = styled.ul`
  list-style: none;
  padding: 0;
`;

const StyledListItem = styled.li`
  cursor: pointer;
  padding: 8px;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;

export default OMDBMovieSearch;