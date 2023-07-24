import { ErrorMessage } from 'components/Error'
import { Form } from 'react-bootstrap'
import styled from 'styled-components'

export const Switch = ({ name, label, checked, handleChange = undefined, gap = '0.5rem', hasError, ...extraProps }) => {
  return (
    <>
      <StyledSwitch
        gap={gap}
        type="switch"
        name={name}
        checked={checked}
        onChange={handleChange}
        label={label}
        hasError={hasError?.[name]}
        {...extraProps}
      />
      {hasError?.[name] && <ErrorMessage subtitle={hasError?.[name]} />}
    </>
  )
}

export const StyledSwitch = styled(Form.Check)`
  display: flex;
  align-items: center;
  gap: ${({ gap }) => gap};

  & input[type='checkbox'] {
    display: block;
  }

  label {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme, hasError }) => (hasError ? theme.colors.stateError : theme.colors.primaryBlack)};
    position: relative;
    top: 0.1em;
  }
`
