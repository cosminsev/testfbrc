import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { fetchOMDBDataByTitle } from '../omdbservice/OmdbServiceSlice'


const OMDBMovieSearch = ({ onMovieSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [moviesData, setMoviesData] = useState([]);

  const dispatch = useDispatch();

  const omdbData = useSelector((state) => state.omdb.searchdata);
  useEffect(() => {
    if (omdbData) {
      console.log(omdbData.appendData);
      if (omdbData.appendData) {
        setMoviesData((prevMoviesData) => [...prevMoviesData, ...omdbData.data?.Search]);
      } else {
        setMoviesData([]);
        setMoviesData(omdbData.data?.Search);
      }
    }
  }, [omdbData]);

  const handleLoadMore = () => {
    setPage(page + 1);
    dispatch(fetchOMDBDataByTitle({title : searchTerm, page: page+1, appendData: true}));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchMovies = () => {
    setPage(1);
    dispatch(fetchOMDBDataByTitle({title : searchTerm, page: 1, appendData: false}));

  };

  const handleMovieSelect = (selectedMovie) => {
    onMovieSelect(selectedMovie.imdbID);
  };

  const totalResults = omdbData?.data?.totalResults || 0;
  const shouldShowLoadMoreButton = moviesData?.length < totalResults;

  return (
    <div>
      <h5>Movie Search</h5>
      <input type="text" value={searchTerm} onChange={handleSearchChange} />
      <Button variant="primary" onClick={searchMovies}>Search</Button>
      <ScrollableDiv>
      <StyledUnorderedList>
        {moviesData?.map((movie) => (
          <StyledListItem key={movie.imdbID+page} onClick={() => handleMovieSelect(movie)}>
            {movie.Title} ({movie.Year})
          </StyledListItem>
        ))}
      </StyledUnorderedList>
      {shouldShowLoadMoreButton && <button variant="secondary" onClick={handleLoadMore}>Load More</button>}
      </ScrollableDiv>
    </div>
  );
};

const ScrollableDiv = styled.div`
  height: 600px; 
  overflow: auto;
`;

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