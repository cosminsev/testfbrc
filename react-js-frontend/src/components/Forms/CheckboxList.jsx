import { useState } from 'react'

export const CheckboxList = ({ options, propName, handleChange }) => {
  const [expand, setExpand] = useState(false)

  return (
    <div>
      {options.slice(0, 5).map((option, i) => {
        return (
          <label className="sf-thin-text sf-checkboxes-input text-capitalize" key={i}>
            <input
              type="checkbox"
              name={`${propName}-${option.name}`}
              onChange={handleChange}
              checked={option.checked}
            />
            <div className="sf-custom-checkbox-input"></div>
            {option.label}
          </label>
        )
      })}

      {expand &&
        options.slice(5, options.length).map((option, i) => {
          return (
            <label className="sf-thin-text sf-checkboxes-input text-capitalize" key={i}>
              <input
                type="checkbox"
                name={`${propName}-${option.name}`}
                onChange={handleChange}
                checked={option.checked}
              />
              <div className="sf-custom-checkbox-input"></div>
              {option.label}
            </label>
          )
        })}

      {options.length > 5 && (
        <div onClick={() => setExpand(!expand)}>
          <p className="text-body-2" role="button">
            {expand ? 'Show less' : 'Show more'}
          </p>
        </div>
      )}
    </div>
  )
}
