import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from '../../../components/Tables/Table'
import { TableBodyActionCell } from '../../../components/Tables/TableBodyActionCell'
import { ReactComponent as EditIcon } from '../../../assets/icons/Edit.svg'
import NoData from '../../../assets/icons/NoData.svg'
import { getMovies } from '../MoviesSlice'
import { setItemsPerPage, setOrdering, setPage } from '../MoviesSlice'
import  AddMoviesModal from '../components/AddMoviesModal'

export const MoviesTable = () => {

  const [showModal, setShowModal] = useState(false);
  const [movieEditId, setmovieEditId] = useState(0);

  const dispatch = useDispatch()
  const {
    moviesTable: { data: movies, isLoading, apiQuery, page, itemsPerPage, totalItems, ordering },
  } = useSelector((state) => state.movies)

  useEffect(() => {
    dispatch(getMovies({ query: apiQuery }))
  }, [dispatch, apiQuery])

  // handlers
  const sortByHandler = (sortName) => {
    dispatch(setOrdering(sortName))
  }

  const changeItemsPerPageHandler = (value) => {
    dispatch(setItemsPerPage(value))
  }

  const changePageHandler = (page) => {
    dispatch(setPage(page))
  }

  const createEditMovieHandler = (movieId) => () => {
    setmovieEditId(movieId)
    setShowModal(true);
  };

  const columns = [
    { name: 'id', label: 'ID' },
    { name: 'action', label: 'action', hideSortBy: true },
    { name: 'imdb_id', label: 'IMDB Id' },
    { name: 'title', label: 'Title' },
    { name: 'release_year', label: 'Release Year' },
    { name: 'images', label: 'Images', hideSortBy: true },
    { name: 'omdb_data', label: 'Omdb Data', hideSortBy: true },
    
  ]
  
  const rows = movies?.data.map((row) => {
    return {
      id: row.id,
      action: (
        <TableBodyActionCell>
          <div className="action-icon" onClick={createEditMovieHandler(row.id)}>
            <EditIcon />
          </div>
        </TableBodyActionCell>
      ),
      imdb_id: row.imdb_id,
      title: row.title,
      release_year: row.release_year,
      images: JSON.stringify(row.images),
      omdb_data: JSON.stringify(row.omdb_data),
      
    }
  })

  const defaultSorting = columns.reduce((cur, nex) => ({ ...cur, [nex.name]: false }), {})
  return (
    <>
      <StyledDiv>
        <Table
          columns={columns}
          rows={rows}
          isLoading={isLoading}
          page={page}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          defaultSorting={defaultSorting}
          changeItemsPerPageHandler={changeItemsPerPageHandler}
          changePageHandler={changePageHandler}
          sortByHandler={sortByHandler}
          ordering={ordering}
          noDataState={{
            title: 'No Movies available.',
            subText: 'You will start to see data after you add some movies.',
            icon: NoData,
          }}
          isSearch={apiQuery.includes('&search=')}
        />
      </StyledDiv>
      <AddMoviesModal showModal={showModal} setShowModal={setShowModal} parammovieEditId={movieEditId} />
    </>
  )
}

const StyledDiv = styled.div`
  .sf-table-container {
    table {
      @media only screen and (min-width: 915px) {
        border: none !important;
      }
      tr {
        @media only screen and (min-width: 915px) {
          border: none !important;
          border-radius: 20px !important;
        }
      }

      td {
        @media only screen and (min-width: 915px) {
          border-bottom: none !important;
          color: #888;
          font-size: 13px;
          font-weight: 600;
        }

        :first-child {
          @media only screen and (min-width: 915px) {
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
          }
        }

        :last-child {
          @media only screen and (min-width: 915px) {
            text-align: center;
          }
        }
      }
      tbody {
        td {
          width: 100%;
          @media only screen and (min-width: 915px) {
            width: auto;
          }
        }
      }
      thead {
        tr {
          &:hover {
            background-color: rgba(233, 65, 65, 0.3) !important;
          }
          th {
            background-color: #fff !important;
            color: #6f7680;
            font-weight: 600;

            :last-child {
              @media only screen and (min-width: 915px) {
                div {
                  display: block;
                }
                text-align: center;
              }
            }
          }
        }
      }
      tr:hover > td {
        background-color: rgb(254, 241, 241) !important;
      }
    }
  }
`
