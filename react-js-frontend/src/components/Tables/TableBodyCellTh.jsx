import styled from 'styled-components'
// styles and assets
import { ReactComponent as EllipseIcon } from 'assets/icons/Ellipse.svg'

export const TableBodyCellTh = ({
  columns,
  columnName,
  iconSrc,
  text,
  pendingAction = undefined,
  className = undefined,
}) => {
  const column = columns?.find((col) => col.name === columnName)
  return (
    <StyledTh data-th={column?.label || 'Subnet'} className={className}>
      <div className="network">
        <div className="icon">
          {pendingAction && <EllipseIcon />}
          {iconSrc && <img src={iconSrc} alt="User Icon" className="user-icon" />}
        </div>
        {text || ''}
      </div>
    </StyledTh>
  )
}

export const StyledTh = styled.td`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1rem;

  .network {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    @media only screen and (min-width: 768px) {
      display: flex;
      text-align: center;
    }
  }

  &.pl-15 {
    padding-left: 15px;
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
