import { ReactComponent as PolygonUp } from '../../assets/icons/PolygonUp.svg'
import { ReactComponent as PolygonDown } from '../../assets/icons/PolygonDown.svg'
import styled from 'styled-components'
import cx from 'classnames'


export const TableHeadCell = ({ column, sortingBy, ordering }) => {
  const { label, name, extraProps } = column
  return (
    <StyledTh {...extraProps}>
      <div>
      {label}
        {!column?.hideSortBy && sortingBy && (
          <span className="sort-buttons">
            <PolygonUp className={cx({ active: column.name === ordering })} onClick={() => sortingBy(name)} />
            <PolygonDown
              className={cx({ active: `-${column.name}` === ordering })}
              onClick={() => sortingBy(`-${name}`)}
            />
          </span>
        )}
      </div>
    </StyledTh>
  )
}

export const StyledTh = styled.th`
  > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
  }

  .sort-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.1em;

    svg {
      width: 0.75em;
      height: 0.75em;

      :hover {
        transform: scale(1.3);
        cursor: pointer;
      }

      &.active {
        transform: scale(1.1);

        path {
          fill: ${({ theme }) => theme.colors.primaryRed};
        }
      }
    }
  }

  &.action > div {
    justify-content: center;
  }
`
