import cx from 'classnames'
import { ErrorMessage } from 'components'
import styled from 'styled-components'

export const Text = ({ name, placeholder, label, value, handleChange, hasError, disabled, readOnly, errorMessage }) => {
  return (
    <StyledDiv className="sf-input-container">
      {label && <label className="sf-form-label">{label}</label>}
      <input
        maxLength={60}
        className={cx({ error: hasError })}
        placeholder={placeholder || 'Type here'}
        type="text"
        name={name}
        disabled={disabled}
        readOnly={readOnly}
        onChange={handleChange}
        value={value !== '' ? value : ' '}
      />
      {errorMessage && <ErrorMessage subtitle={errorMessage} />}
    </StyledDiv>
  )
}

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.435rem;
  }

  input {
    /* padding: 0.5em; */

    /* &[readonly] {
      background-color: #d4d8dc !important;
    } */
  }
`
