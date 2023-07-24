import styled from 'styled-components'
// styles and assets
import { ReactComponent as EllipseIcon } from 'assets/icons/Ellipse.svg'

export const TableBodyCellTd = ({ columns, columnName, iconSrc, text, pendingAction = undefined }) => {
  const column = columns?.find((col) => col.name === columnName)
  
  return (
    <StyledTd data-th={column?.label || 'Service'}>
      <div className="td-container">
        <div className="icon">
          {pendingAction && <EllipseIcon />}
          {iconSrc && <img src={iconSrc} alt="User Icon" className="user-icon" />}
        </div>
        <div> {text || ''}</div>
      </div>
    </StyledTd>
  )
}

export const StyledTd = styled.td`
  font-size: 1rem;

  .td-container {
    display: flex;
    align-items: center;
  }

  .icon {
    position: relative;

    svg {
      position: absolute;
      right: 0.7em;
      width: 0.5em;
      height: 0.5em;

      circle {
        fill: ${({ theme }) => theme.colors.primaryRed};
      }
    }
  }
`
