import styled from 'styled-components'

export const TableBodyCellCustom = ({ columns, columnName, children, onClick = undefined }) => {
  const column = columns?.find((col) => col.name === columnName) || {};

  return (
    <StyledTd data-th={column?.label || 'Label'} onClick={onClick}>
      {children}
    </StyledTd>
  )
}

export const StyledTd = styled.td`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'normal')};
`
