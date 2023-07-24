import styled from 'styled-components'
// styles and assets
// import { ReactComponent as CaretLeftDoubleIcon } from '../../assets/icons/CaretLeftDouble.svg'
// import { ReactComponent as CaretLeftSimpleIcon } from '../../assets/icons/CaretLeftSimple.svg'
// import { ReactComponent as CaretRightDoubleIcon } from '../../assets/icons/CaretRightDouble.svg'
// import { ReactComponent as CaretRightSimpleIcon } from '../../assets/icons/CaretRightSimple.svg'
import { Pagination, Dropdown, DropdownButton } from 'react-bootstrap'

export const TablePagination = ({ changeItemsPerPageHandler, changePage, totalPages, currentPage, itemsPerPage }) => {
  return (
    <StyledPagination>
      <div className="pagination-dropdown">
        <p className="pagination-paragraph">Show</p>
        <DropdownButton
          name="show-items"
          id="pages dropdown-button-drop-down-centered"
          size="md"
          key="down-centered"
          drop="down-centered"
          title={itemsPerPage}
          onSelect={(event) => changeItemsPerPageHandler(event)}
        >
          <Dropdown.Item eventKey="15">15</Dropdown.Item>
          <Dropdown.Item eventKey="50">50</Dropdown.Item>
          <Dropdown.Item eventKey="100">100</Dropdown.Item>
          <Dropdown.Item eventKey="500">500</Dropdown.Item>
        </DropdownButton>
        <p className="pagination-paragraph">entries</p>
      </div>
      <Pagination size="md" className="pagination">
        <Pagination.First disabled={currentPage === 1} onClick={() => currentPage !== 1 && changePage(1)} />
        <Pagination.Prev
          disabled={currentPage - 1 <= 0}
          onClick={() => currentPage - 1 > 0 && changePage(currentPage - 1)}
        />
        <Pagination.Item disabled>
          Page <span>{currentPage}</span> of <span>{totalPages}</span>
        </Pagination.Item>
        <Pagination.Next
          disabled={currentPage + 1 > totalPages}
          onClick={() => currentPage + 1 <= totalPages && changePage(currentPage + 1)}
        />
        <Pagination.Last
          disabled={currentPage === totalPages}
          onClick={() => currentPage !== totalPages && changePage(totalPages)}
        />
      </Pagination>
    </StyledPagination>
    // <div className='pagination'>
    //   <div className='show-text'>Show</div>
    //   <select
    //     name='show-items'
    //     id='pages'
    //     onChange={(event) => changeItemsPerPageHandler(event.target.value)}
    //   >
    //     <option value='15'>15</option>
    //     <option value='50'>50</option>
    //     <option value='100'>100</option>
    //     <option value='500'>500</option>
    //   </select>
    //   <CaretRightDoubleIcon
    //     onClick={() => currentPage !== 1 && changePage(1)}
    //   />
    //   <CaretRightSimpleIcon
    //     onClick={() => currentPage - 1 > 0 && changePage(currentPage - 1)}
    //   />
    //   <div className='page-number'>
    //     Page <span>{currentPage}</span> of <span>{totalPages}</span>
    //   </div>
    //   <CaretLeftSimpleIcon
    //     onClick={() =>
    //       currentPage + 1 <= totalPages && changePage(currentPage + 1)
    //     }
    //   />
    //   <CaretLeftDoubleIcon
    //     onClick={() => currentPage !== totalPages && changePage(totalPages)}
    //   />
    // </div>
  )
}

const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  .pagination-dropdown {
    display: flex;
    align-items: center;
    margin-block: 20px;

    .pagination-paragraph {
      color: #8ca6ba;
      padding: 0.375rem 0.75rem;
      font-size: 13px;
    }
  }

  .pagination {
    width: fit-content;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
  }

  .dropdown-menu {
    border: none;
    box-shadow: 0 0.188rem 0.313rem 0.125rem rgba(0, 0, 0, 0.10);
  }

  .dropdown-toggle {
    border: 1px solid #d3d4d8;
    border-radius: 0.25rem;
    height: 35.75px;
    width: fit-content;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);

    button {
      height: 100%;
    }
  }

  .btn-primary.dropdown-toggle {
    background-color: #fafafa;
    color: #8ca6ba;
    border-color: #d3d4d8;
    padding: 0.375rem 0.75rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);

    :hover {
      color: #fafafa;
      background-color: #8ca6ba;
      border: 1px solid #8ca6ba;
    }

    :focus {
      box-shadow: 0 0.5rem 1rem rgba(140, 166, 186, 0.05);
    }
  }

  .dropdown-item {
    color: #8ca6ba;
    font-size: 14.5px;
    transition: 0.3s ease;

    :hover {
      color: #fafafa;
      background-color: #8ca6ba;
    }

    :active {
      color: #fafafa;
      background-color: #8ca6ba;
    }
  }

  .page-item .page-link {
    background-color: #ffffff;
    color: #8ca6ba;
    border: 1px solid #d3d4d8;
    font-size: 14.5px;

    :hover {
      background-color: #8ca6ba;
      border: 1px solid #8ca6ba;
      color: #ffffff;
    }

    :focus {
      box-shadow: none;
      color: #ffffff;
      background-color: #8ca6ba;
      border: 1px solid #8ca6ba;
    }
  }
`
