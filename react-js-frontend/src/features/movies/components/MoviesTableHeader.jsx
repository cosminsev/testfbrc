import styled from 'styled-components'
import { SearchBox } from '../../../components/Forms/SearchBox'
import { CustomFilter } from '../../../components/Forms/CustomFilter'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilters, setSearchQuery } from '../MoviesSlice'
import { defaultFilters } from '../MoviesModel'


export const MoviesTableHeader = () => {
  const dispatch = useDispatch()
  let searchValueText = ''

  const handleApplyFilter = useCallback(
    (filters) => {
      dispatch(setFilters(filters))
    },
    [dispatch],
  )

  const handleSearch = (query) => {
    dispatch(setSearchQuery(query))
  }

  return (
    <StyledDiv>
      <div className="table-container">
        <h2 className="table-title">Movies</h2>
        <div className="search-container">
          <SearchBox handleSearch={handleSearch} searchValue={searchValueText || ''} />
        </div>
      </div>
      <div className="filter-container">
        <CustomFilter defaultFilters={defaultFilters} handleApplyFilter={handleApplyFilter} isDisabled={false} />
      </div>
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  .table-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1.5rem;

    @media only screen and (min-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  .table-title {
    font-size: 24px;
    flex-grow: 1;

    @media only screen and (min-width: 768px) {
      font-size: 32px;
      padding-right: 24px;
    }
  }

  .search-container {
    flex-grow: 3.5;
    width: 100%;

    @media only screen and (min-width: 768px) {
      width: auto;
    }
  }

  .cart-container {
    width: 100%;
    flex-grow: 1;

    @media only screen and (min-width: 768px) {
      width: 96px;
      min-width: 200px;
    }
  }

  .filter-container {
    margin-top: 30px;
  }
`
