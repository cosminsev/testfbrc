import styled from 'styled-components'
// components
import { SearchBox } from 'components'

export const TableHeader = ({
  label,
  searchHandler,
  addResourceModal,
  selectedRows,
  loggedInUserRole,
  selectedRowsActionComponent,
}) => {
  return (
    <StyledDiv>
      <h3>{label || ''}</h3>

      <div>
        {searchHandler && <SearchBox handleSearch={searchHandler} />}
        {['manager'].includes(loggedInUserRole) &&
          (!selectedRows.length
            ? addResourceModal
            : selectedRowsActionComponent)}
      </div>
    </StyledDiv>
  )
}

export const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 1em;

  h3 {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.typography.h3};
    line-height: 24px;
  }

  > div,
  > p {
    display: flex;
    align-items: center;
    gap: 1em;
  }
`
