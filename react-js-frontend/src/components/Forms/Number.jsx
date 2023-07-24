import cx from 'classnames'
import { ErrorMessage } from 'components/Error'
import styled, { css } from 'styled-components'

export const Number = ({
  name,
  placeholder,
  label,
  value,
  handleChange,
  handleKeyDown,
  hasError,
  errorMessage,
  disabled,
  readOnly,
  min,
  prefix,
  ...extraProps
}) => {
  return (
    <StyledDiv className="sf-input-container" prefix={prefix}>
      {label && <label className="sf-form-label">{label}</label>}
      <div className="input-container">
        {prefix && <span className="prefix">{prefix}</span>}
        <input
          className={cx('sf-form-input', { error: hasError || errorMessage })}
          placeholder={placeholder || 'Type here'}
          type="number"
          name={name}
          disabled={disabled}
          readOnly={readOnly}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={value}
          min={min}
          {...extraProps}
        />
      </div>
      {errorMessage && <ErrorMessage subtitle={errorMessage} />}
      {hasError?.[name] && <ErrorMessage subtitle={hasError?.[name]} />}
    </StyledDiv>
  )
}

export const StyledDiv = styled.div`
  input {
    &[readonly] {
      background-color: #d4d8dc;
    }
  }

  .sf-form-input {
    width: 100%;
  }

  ${({ prefix }) =>
    prefix &&
    css`
      > .input-container {
        position: relative;

        input {
          padding-left: 1rem;
        }

        .prefix {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 0.375rem;
        }
      }
    `}
`
