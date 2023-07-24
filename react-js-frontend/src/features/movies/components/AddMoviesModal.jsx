import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { fetchOMDBDataByImdbId } from '../../../features/omdbservice/OmdbServiceSlice'
import { storeMovies, updateMovies, deleteMovie, getMovies, getMovieData } from '../MoviesSlice'
import  OMDBMovieSearch from '../../omdbservice/OMDBMovieSearch'

const OMDBResponse = styled.textarea`
width: 100%;
height: 200px;
resize: none;
font-family: monospace;
`;

const AddMoviesModal = ({ showModal, setShowModal, parammovieEditId }) => {

  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [images, setImages] = useState(null);
  const [omdbData, setOMDBData] = useState(null);
  const [imagesjson, setImagesjson] = useState(null);
  const [omdbDatajson, setOMDBDatajson] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const omdbStateData = useSelector((state) => state.omdb.data);
  const {
    movie: { data: editMovie, isLoading, error },
  } = useSelector((state) => state.movies)

  useEffect(() => {
    resetInputs();
    if (parammovieEditId) {
        // If the movie exists, 
        setEditMode(true);
        dispatch(getMovieData({'id' : parammovieEditId}));
        }
  }, [showModal]);

  useEffect(() => {
    setImdbId(editMovie?.imdb_id);
    setReleaseYear(editMovie?.release_year);
    setTitle(editMovie?.title);
    setImages(editMovie?.images);
    setOMDBData(editMovie?.omdb_data);
    setImagesjson(JSON.stringify(editMovie?.images, null, 2));
    setOMDBDatajson(JSON.stringify(editMovie?.images, null, 2))
        
  }, [editMovie]);

  const handleImdbIdChange = (e) => {
    const newValue = e.target.value;
    setImdbId(newValue)

    const imdbIdRegex = /^tt\d{7,}$/;
    if (imdbIdRegex.test(newValue)) {
        dispatch(fetchOMDBDataByImdbId(newValue));
    } 
  };

//   if omdbStateData is found
  useEffect(() => {
    if (omdbStateData) {
        // setYear
        setReleaseYear(omdbStateData.Year)
        // setTitle
        setTitle(omdbStateData.Title)
        // newImagesJSON
        const newImagesJSON = {
            poster: omdbStateData.Poster,
        };
        setImages(newImagesJSON);
        setImagesjson(JSON.stringify(newImagesJSON, null, 2));
        // setOMDBData
        setOMDBData(omdbStateData)
        setOMDBDatajson(JSON.stringify(omdbStateData, null, 2))
    }
  }, [omdbStateData]);

  const resetInputs = () => {
    setTitle('');
    setReleaseYear('');
    setImdbId('');
    setImages('');
    setOMDBData('');
    setImagesjson('');
    setOMDBDatajson('');
    setErrorMessage('');
  };

  const handleSave = () => {

    const newMovieData = {
        title: title,
        release_year: releaseYear,
        imdb_id: imdbId,
        images: images,
        omdb_data: omdbData,
      };

      const storeAndFetchMovies = async (newMovieData) => {
        //if is edit ID
        let resultAction; 
        if (parammovieEditId) {
          resultAction = await dispatch(updateMovies({ updateid: parammovieEditId, request: newMovieData }));
        } else {
          resultAction = await dispatch(storeMovies({ request: newMovieData }));
        }
        if (storeMovies.rejected.match(resultAction)) {
            const ResErrors = JSON.stringify(resultAction?.payload?.errors, null, 2);
            setErrorMessage(ResErrors || 'Failed to add/update movie.');

        } else {
            setShowModal(false);
            resetInputs();
            await dispatch(getMovies([]));
        } 
    
      };

      storeAndFetchMovies(newMovieData)

  };

  const handleDeleteMovie = (movieId) => {
    
    const deleteMovieaction = async (movieIdIn) => {
        await dispatch(deleteMovie({id : movieIdIn}));
        await dispatch(getMovies([]))
      };
      deleteMovieaction(movieId);
      resetInputs();
      setShowModal(false);
  };

  const handleMovieSelect = (imdbId) => {
    setImdbId(imdbId);
    dispatch(fetchOMDBDataByImdbId(imdbId));
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
      <Modal.Header closeButton>
      <Modal.Title>{parammovieEditId > 0 ? "Edit Movie" : "Add Movie"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {/* Left half of the modal - Add Movie Details */}
          <Col>
            <Form>
            <Form.Group controlId="imdbId">
                <Form.Label>IMDb ID</Form.Label>
                <Form.Control
                  type="text"
                  value={imdbId}
                  onChange={handleImdbIdChange}
                  placeholder="Enter IMDb ID"
                />
              </Form.Group>

              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                />
              </Form.Group>

              <Form.Group controlId="releaseYear">
                <Form.Label>Release Year</Form.Label>
                <Form.Control
                  type="number"
                  value={releaseYear}
                  onChange={(e) => setReleaseYear(e.target.value)}
                  placeholder="Enter release year"
                />
              </Form.Group>


              <Form.Group controlId="images">
                <Form.Label>Movie Images JSON</Form.Label>
                <OMDBResponse readOnly value={imagesjson} />
              </Form.Group>

              <Form.Group controlId="formOMDBData">
                <Form.Label>OMDB JSON Response</Form.Label>
                <OMDBResponse readOnly value={omdbDatajson} />
              </Form.Group>

            </Form>
          </Col>

          <Col>
          {!parammovieEditId && <OMDBMovieSearch onMovieSelect={handleMovieSelect} />}
          </Col>
        </Row>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        {parammovieEditId !== null && parammovieEditId !== undefined && parammovieEditId !== 0 && (
          <Button variant="danger" onClick={() => handleDeleteMovie(parammovieEditId)}>
            Delete
          </Button>
        )}
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddMoviesModal;