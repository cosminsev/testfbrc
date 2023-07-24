import React from 'react'
import styled from 'styled-components'
import { TableBodyNoData } from './TableBodyNoData'
import LoadingIcon from '../../assets/icons/LoadingIcon.svg'
import MagnifierIcon from '../../assets/icons/MagnifyingGlassIcon.svg'
// import { Button } from 'components'

export const TableBody = ({
  isLoading,
  error,
  rows,
  columns,
  hiddenColumns,
  noDataState,
  isSearch,
  selectableRows,
  selectedRows,
  toggleSelectRowHandler,
}) => {
  return (
    <tbody>
      {isLoading && (
        <TableBodyNoData
          icon={LoadingIcon}
          text="Loading..."
          columnsCount={selectableRows ? columns.length + 1 : columns.length}
          noDataRows={noDataState?.noDataRows}
        />
      )}
      {error && (
        <TableBodyNoData
          icon={LoadingIcon}
          text={error}
          columnsCount={selectableRows ? columns.length + 1 : columns.length}
          noDataRows={noDataState?.noDataRows}
        />
      )}
      {!isLoading && !error && (
        <>
          {!rows?.length && noDataState ? (
            isSearch ? (
              <TableBodyNoData
                icon={MagnifierIcon}
                text="Nothing found"
                columnsCount={selectableRows ? columns.length + 1 : columns.length}
                subText="We couldn’t find any results."
                noDataRows={noDataState?.noDataRows}
              />
            ) : (
              <TableBodyNoData
                icon={noDataState?.icon}
                text={noDataState?.title}
                columnsCount={selectableRows ? columns.length + 1 : columns.length}
                subText={noDataState?.subText}
                noDataRows={noDataState?.noDataRows}
              />
            )
          ) : (
            rows?.map((row, index) => {
              return (
                <tr key={index}>
                  {selectableRows && rows?.length && (
                    <StyledTh>
                      <label className="sf-thin-text sf-checkboxes-input d-block m-0">
                        <input
                          name={row.id}
                          type="checkbox"
                          checked={selectedRows[row.id]}
                          onChange={toggleSelectRowHandler}
                        />
                        <div className="sf-custom-checkbox-input mx-auto"></div>
                      </label>
                    </StyledTh>
                  )}
                  {columns?.map((column, index) => {
                    const isVisibleColumn = !hiddenColumns?.includes(column.name)
                    if (isVisibleColumn) {
                      return React.isValidElement(row[column.name]) ? (
                        <React.Fragment key={`column-${index}`}>{row[column.name]}</React.Fragment>
                      ) : (
                        <td data-th={column?.label || 'Label'} key={`column-${index}`}>
                          {column.format ? column.format(row[column.name]) || '-' : row[column.name]}
                        </td>
                      )
                    }
                    return null
                  })}
                </tr>
              )
            })
          )}
        </>
      )}
    </tbody>
  )
}

export const StyledTh = styled.th`
  width: 42px;
  vertical-align: middle;
  z-index: 3;
`
