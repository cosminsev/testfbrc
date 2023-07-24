import styled from 'styled-components'

export const TableBodyEllipsisCell = ({ text }) => {
  return <StyledTd>{text}</StyledTd>
}

export const StyledTd = styled.td`
  text-overflow: ellipsis;
  max-width: 15ch;
  overflow: hidden;
`
