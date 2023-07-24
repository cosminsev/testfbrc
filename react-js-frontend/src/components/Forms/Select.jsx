import cx from 'classnames'
import { ErrorMessage } from 'components'

export const Select = ({
  name,
  options,
  label,
  value,
  placeholder = '',
  readOnly = false,
  disabled = false,
  handleChange,
  helperText = '',
  hasError = false,
  required = false,
  errorMessage = '',
}) => {
  return (
    <div className="sf-input-container">
      {label && <label className="sf-form-label">{label}</label>}

      <select
        className={cx('selectpicker sf-form-input', { error: hasError?.[name] })}
        name={name}
        onChange={handleChange}
        value={value}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
      >
        {placeholder && <option value="">{`--- ${placeholder} ---`}</option>}
        {options?.map((option, i) => {
          return (
            <option value={option.value} key={i} disabled={option.disabled}>
              {option.label}
            </option>
          )
        })}
      </select>
      {hasError?.[name] && <ErrorMessage subtitle={hasError?.[name]} />}
      {errorMessage && !hasError?.[name] && <ErrorMessage subtitle={errorMessage} />}
      {helperText && <small className="mt-1 pl-1 d-inline-block text-secondary">{helperText}</small>}
    </div>
  )
}
