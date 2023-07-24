import styled from 'styled-components'

export const TableBodyActionCell = ({ columns, columnName, children }) => {
  const column = columns?.find((col) => col.name === columnName) || {}
  return (
    <StyledTd data-th={column?.label || 'Actions'} className="wrapper-images">
      {children}
    </StyledTd>
  )
}

export const StyledTd = styled.td`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.325em;

  .cell-paragraph {
    color: ${({ theme }) => theme.colors.secondaryMessyBlue};
    font-size: 13px;
    font-weight: 600;
    line-height: 24px;
  }
`
