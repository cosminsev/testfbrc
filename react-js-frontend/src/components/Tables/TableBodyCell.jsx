import styled from 'styled-components'

export const TableBodyCell = ({ columns, columnName, text, onClick = undefined }) => {
  const column = columns?.find((col) => col.name === columnName) || {};

  return (
    <StyledTd data-th={column?.label || 'Status'} onClick={onClick}>
      {text || '-'}
    </StyledTd>
  )
}

export const StyledTd = styled.td`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'normal')};
`
