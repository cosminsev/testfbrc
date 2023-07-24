import cx from 'classnames'
import { ErrorMessage } from 'components'

export const Date = ({
  name,
  placeholder,
  label,
  value,
  handleChange,
  hasError,
  required,
  errorMessage,
  readOnly,
  min,
  max,
}) => {
  return (
    <div className="sf-input-container">
      {label && <label className="sf-form-label">{label}</label>}

      <input
        className={cx({ error: hasError || errorMessage })}
        placeholder={placeholder || 'Type here'}
        type="date"
        name={name}
        onChange={handleChange}
        defaultValue={value}
        required={required}
        readOnly={readOnly}
        min={min}
        max={max}
      />
      {errorMessage && !hasError?.[name] && <ErrorMessage subtitle={errorMessage} />}
      {hasError?.[name] && <ErrorMessage subtitle={hasError?.[name]} />}
    </div>
  )
}
