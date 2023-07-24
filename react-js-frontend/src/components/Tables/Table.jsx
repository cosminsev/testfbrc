import { useEffect, useState } from 'react'
// components
import { TableBody } from './TableBody'
import { TableHead } from './TableHead'
import { TablePagination } from './TablePagination'


import CustomDivider from './Divider'
// styles and assets
import StyledTable from './StyledTable'

export const Table = ({
  itemsPerPage = 0,
  isLoading = false,
  error = null,
  totalItems = 0,
  page = 0,
  rows,
  columns,
  hiddenColumns = [],
  ordering = null,
  defaultSorting = undefined,
  changeItemsPerPageHandler = undefined,
  changePageHandler = undefined,
  sortByHandler = undefined,
  noDataState = undefined,
  isSearch = undefined,
  selectableRowsHandler = undefined,
  disablePagination = false,
}) => {
  // local state
  const allRowsDeselected = {}
  const allRowsSelected = {}
  rows?.forEach((row) => (allRowsDeselected[row.id] = false))
  rows?.forEach((row) => (allRowsSelected[row.id] = true))
  const [selectedRows, setSelectedRows] = useState(allRowsDeselected)

  // effects
  useEffect(() => {
    if (selectableRowsHandler) {
      // Getting only selected rows
      selectableRowsHandler(Object.keys(selectedRows).filter((key) => selectedRows[key]))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRows])

  // handlers
  const sortingBy = (type) => {
    sortByHandler && sortByHandler(type === ordering ? '' : type)
    changePageHandler && changePageHandler(1)
  }

  const changePage = (page) => {
    changePageHandler(page)
  }

  const toggleSelectAllRowsHandler = (e) => {
    const { checked } = e.target
    setSelectedRows(checked ? allRowsSelected : allRowsDeselected)
  }

  const toggleSelectRowHandler = (e) => {
    const { checked, name } = e.target
    setSelectedRows((state) => ({ ...state, [name]: checked ? true : false }))
  }

  // variables
  let totalPages = Math.ceil(totalItems / itemsPerPage)

  return (
    <StyledTable>
      <div className="sf-table-container">
        <table className="table first-col-sticky">
          <TableHead
            columns={columns}
            hiddenColumns={hiddenColumns}
            sortingBy={sortingBy}
            selectableRows={selectableRowsHandler}
            selectedRows={selectedRows}
            rows={rows}
            toggleSelectAllRowsHandler={toggleSelectAllRowsHandler}
            ordering={ordering}
          />
          <TableBody
            columns={columns}
            hiddenColumns={hiddenColumns}
            rows={rows}
            isLoading={isLoading}
            error={error}
            noDataState={noDataState}
            isSearch={isSearch}
            selectableRows={selectableRowsHandler}
            selectedRows={selectedRows}
            toggleSelectRowHandler={toggleSelectRowHandler}
          />
        </table>
      </div>
      {!disablePagination && (
        <>
          <CustomDivider />
          <TablePagination
            changeItemsPerPageHandler={changeItemsPerPageHandler}
            changePage={changePage}
            itemsPerPage={itemsPerPage}
            totalPages={totalPages}
            currentPage={rows?.length ? page : 0}
          />
        </>
      )}
    </StyledTable>
  )
}
