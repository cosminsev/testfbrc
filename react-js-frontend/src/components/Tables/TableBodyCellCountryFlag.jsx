import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import ReactCountryFlag from 'react-country-flag'
import styled from 'styled-components'
import { codesWithCountries, countriesWithCodes } from 'constants/utils'

export const TableBodyCellCountryFlag = ({ columns, columnName, country }) => {
  const tooltipText = codesWithCountries?.[country?.toLowerCase()]
    ? codesWithCountries[country?.toLowerCase()]
    : country

  const countryCode = codesWithCountries[country?.toLowerCase()] ? country : countriesWithCodes[country]

  const column = columns?.find((col) => col.name === columnName) || {}

  return (
    <StyledTd data-th={column?.label || 'Country'}>
      <div>
        <OverlayTrigger
          overlay={<Tooltip id="tooltip-disabled">{tooltipText + ' - Ip2location'}</Tooltip>}
          placement="right"
        >
          <span className="d-inline-block wrapper-country">
            <ReactCountryFlag
              countryCode={countryCode}
              svg
              style={{
                width: '2.5em',
                height: 'auto',
              }}
            />
          </span>
        </OverlayTrigger>
      </div>
    </StyledTd>
  )
}

export const StyledTd = styled.td`
  img {
    border-radius: 6px;
    box-shadow: 0px 4px 8px rgb(0 0 0 / 29%);
  }
`
