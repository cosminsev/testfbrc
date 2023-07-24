import ReactCountryFlag from 'react-country-flag'
import Select from 'react-select'
import styled from 'styled-components'
import { countryPhonePrefixes } from 'utils/countryPhonePrefixes'

export const PhonePrefixSelect = ({ field, handleChange, value, className }) => {
  const options = countryPhonePrefixes.map((prefix) => ({
    value: prefix.dial_code,
    label: prefix.dial_code,
    country: prefix.code,
  }))
  const curValue = options.find((option) => option.value === value)
  return (
    <Div>
      <Select
        className={`react-select flex-1 ${className}`}
        classNamePrefix="react-select"
        value={curValue}
        name={`${field.name}`}
        onChange={({ value }) => handleChange({ target: { name: field.prefixName, value } })}
        options={options}
        maxMenuHeight="50px"
        menuPlacement="top"
        // isSearchable={true}
        formatOptionLabel={(country) => (
          <div className="d-flex align-items-center gap-1">
            <ReactCountryFlag
              countryCode={country.country}
              svg
              style={{
                width: '2.5em',
                height: 'auto',
              }}
            />

            {country.value}
          </div>
        )}
      />
    </Div>
  )
}

const Div = styled.div`
  width: 100%;
  .react-select {
    .react-select__control {
      color: ${({ theme }) => theme.colors.neutralDarkGrey};
      min-height: 46px;
      border: 1px solid #6d757d;
      flex-basis: 44%;

      .react-select__value-container--has-value {
        padding-right: 0;
      }
    }

    .react-select__indicator {
      padding-left: 0;
      padding-right: 4px;
    }

    .react-select__menu {
      overflow: hidden;

      > * {
        max-height: 8rem;
      }
    }
  }

  .react-select.error {
    .react-select__control {
      border: 1px solid red;
    }
  }
`
