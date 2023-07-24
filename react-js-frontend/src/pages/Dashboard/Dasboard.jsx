import React, { useState } from 'react';
import MainLogo from '../../components/Logo/logo'
import { Button } from 'react-bootstrap';
import styled from 'styled-components'
import { MoviesTableHeader, MoviesTable } from '../../features/movies/components'
import  AddMoviesModal from '../../features/movies/components/AddMoviesModal'

const Dashboard = () => {

  const [showModal, setShowModal] = useState(false);
  const [movieEditId, setmovieEditId] = useState(0);

  const handleAddMovieButtonClick = () => {
    setmovieEditId(0);
    setShowModal(true);
  };

  return (
    <div>
      <StyledDashboardWrapper>
       <MainLogo />
        <StyledButton variant="primary" onClick={handleAddMovieButtonClick}>Add Movie</StyledButton>
        <MoviesTableHeader />
        <MoviesTable />
      </StyledDashboardWrapper>
      <AddMoviesModal showModal={showModal} setShowModal={setShowModal} parammovieEditId={movieEditId} />
    </div>
  );
};

const StyledDashboardWrapper = styled.div`
  width: 100%;
  padding: 4% 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1045px;
  margin: 0 auto;

  @media only screen and (min-width: 3840px) {
    max-width: 1490px;
  }

  .footer {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
      color: #000000;
    }

    button {
      background-color: transparent;
      color: ${({ theme }) => theme.colors.primaryRed};
      padding: 5px;
      font-size: 14px;

      @media only screen and (min-width: 3840px) {
        font-size: 28px;
        padding: 10px;
      }
    }
  }
`

const StyledButton = styled.button`
  font-size: 12px;
  float: right;
  width: 100px;
  background-color: #007bff; /* Primary button color in older bootstrap */
  color: #fff; /* Text color for the primary button */
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3; /* Hover color for the primary button */
  }

`;

export default Dashboard;