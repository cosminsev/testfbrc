import cx from 'classnames'
import { ErrorMessage } from 'components/Error'
import styled from 'styled-components'
interface IProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string
  wrapperClassName?: string
  hasError?: any
}

export const Input = ({ name = '', label, wrapperClassName, type, hasError, ...extraProps }: IProps) => {
  return (
    <Div>
      <label htmlFor={name}>
        {label && <div className="labelText">{label}</div>}
        <input
          maxLength={60}
          type={type || 'text'}
          className={cx({ error: hasError || hasError?.[name] })}
          name={name}
          id={name}
          {...extraProps}
        />
      </label>
      {hasError?.[name] && <ErrorMessage subtitle={hasError?.[name]} />}
    </Div>
  )
}

const Div = styled.div`
  width: 100%;

  label {
    width: 100%;
    font-weight: bold;

    input {
      padding: 0.5rem 0.75rem;
      width: 100%;

      &.error {
        border: 1px solid ${({ theme }) => theme.colors.stateError};
      }
    }
  }

  .labelText {
    text-align: left;
    padding-bottom: 0.5rem;
  }
`
