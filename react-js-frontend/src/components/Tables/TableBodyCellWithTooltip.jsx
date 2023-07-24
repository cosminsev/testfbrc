import styled from 'styled-components'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

export const TableBodyCellWithTooltip = ({ columns, columnName, text, tooltipText, onClick }) => {
  const column = columns?.find((col) => col.name === columnName) || {}

  return (
    <StyledTd data-th={column?.label || 'Proxy'} onClick={onClick}>
      <OverlayTrigger placement="top" overlay={<Tooltip id={`table-cell-tooltip-top`}>{tooltipText}</Tooltip>}>
        <span>{text}</span>
      </OverlayTrigger>
    </StyledTd>
  )
}

export const StyledTd = styled.td`
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'normal')};
`
