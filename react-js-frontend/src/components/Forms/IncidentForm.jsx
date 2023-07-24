import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { ReactComponent as QuestionIcon } from 'assets/icons/QuestionIcon.svg'
import { ErrorMessage } from 'components'
// import StyledTooltipTrigger from 'styles/StyledTooltipTrigger'
import { Tooltip } from 'components/Labels'

export const IncidentForm = ({ fields, updateHandler, isError }) => {
  const listInputsValidation = {}
  const listInputsOnChange = {}
  const listInputsErrorMessages = {}
  const defaultValues = fields.reduce((cur, nex) => ({ ...cur, [nex.name]: nex.value }), {})

  fields.forEach((input) => {
    listInputsValidation[input.name] = null
    listInputsOnChange[input.name] = null
    listInputsErrorMessages[input.name] = null
  })

  // local state
  const [inputs, setInputs] = useState(defaultValues)
  const [inputIsValid, setInputIsValid] = useState(listInputsValidation)
  const [inputsOnChange, setInputsOnChange] = useState(listInputsOnChange)
  const [inputsErrorMessages, setInputsErrorMessages] = useState(listInputsErrorMessages)
  // handlers
  const handleChange = (e) => {
    if (e.target.type === 'text')
      setInputs({ ...inputs, [e.target.name]: e.target.value.length <= 60 ? e.target.value : inputs[e.target.name] })
    if (e.target.type === 'textarea')
      setInputs({ ...inputs, [e.target.name]: e.target.value.length <= 300 ? e.target.value : inputs[e.target.name] })
    if (e.target.type === 'select-one') setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  // effects
  useEffect(() => {
    if (isError) {
      setInputsOnChange(listInputsErrorMessages)
    }
  }, [isError])

  useEffect(() => {
    setInputs(defaultValues)
  }, [fields])

  const checkInputValidation = (name) => {
    updateHandler(inputs)
    const thisInput = fields.find((input) => input.name === name)
    setInputsOnChange({ ...inputsOnChange, [thisInput.name]: true })
    if (thisInput.validation) {
      setInputIsValid({
        ...inputIsValid,
        [thisInput.name]: thisInput.validation(inputs[name]),
      })
    } else {
      setInputIsValid({ ...inputIsValid, [thisInput.name]: true })
    }

    if (thisInput.errorMessage) {
      setInputsErrorMessages({
        ...inputsErrorMessages,
        [thisInput.name]: thisInput.errorMessage(inputs[name]),
      })
    } else {
      setInputsErrorMessages({ ...inputsErrorMessages, [thisInput.name]: null })
    }
  }

  const rows = fields.reduce(function (rows, key, index) {
    return (index % 2 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows
  }, [])

  return (
    <StyledDiv>
      <div className="sf-staff-info__form">
        {rows.map((row, i) => {
          return (
            <div key={`tabFormRow-${i}`} className="sf-staff-info__row">
              {row.map((col, ind) => {
                return (
                  <div key={`tabFormField-${ind}`} className="sf-input-container">
                    <label className="sf-form-label d-flex align-items-center gap-1">
                      {col.label}{' '}
                      {col.tooltip && (
                        <span>
                          <Tooltip text={<QuestionIcon className="question-icon" />} tooltipText={col.tooltip} />
                        </span>
                      )}{' '}
                      {col.isrequired && <span className="color-error">*</span>}
                    </label>
                    {
                      {
                        select: (
                          <>
                            <select
                              className={`selectpicker sf-form-input ${
                                inputIsValid[col.name] === false ||
                                (isError?.[col.name]?.length > 0 && inputsOnChange?.[col.name] === null)
                                  ? 'error'
                                  : ''
                              }`}
                              name={col.name}
                              value={inputs[col?.name] || ''}
                              onChange={handleChange}
                              disabled={col.readOnly}
                              readOnly={col.readOnly}
                              onBlur={() => checkInputValidation(col.name)}
                              isrequired={`${col.isrequired}`}
                            >
                              <option value="">{`--- ${col.placeholder || 'Choose an option'} ---`}</option>
                              {col?.options?.map((option, inx) => {
                                return (
                                  <option value={option.value} key={inx}>
                                    {option.title}
                                  </option>
                                )
                              })}
                            </select>
                            {isError?.[col.name] && inputsOnChange?.[col.name] === null && (
                              <ErrorMessage subtitle={isError?.[col.name]} />
                            )}
                            {inputIsValid[col.name] === false && !isError?.[col.name] && (
                              <ErrorMessage subtitle={col.errorMessage} />
                            )}
                          </>
                        ),
                        text: (
                          <>
                            <input
                              className={`sf-form-input ${
                                inputIsValid[col.name] === false ||
                                (isError?.[col.name]?.length > 0 && inputsOnChange?.[col.name] === null)
                                  ? 'error'
                                  : ''
                              }`}
                              autoComplete="on"
                              type="text"
                              name={col.name}
                              value={inputs[col?.name] || ''}
                              onChange={handleChange}
                              readOnly={col.readOnly}
                              disabled={col.readOnly}
                              placeholder={col.placeholder || 'Type here'}
                              onBlur={() => checkInputValidation(col.name)}
                              isrequired={`${col.isrequired}`}
                            />
                            {isError?.[col.name] && inputsOnChange?.[col.name] === null && (
                              <ErrorMessage subtitle={isError?.[col.name]} />
                            )}
                            {isError?.[col.name] &&
                              inputsOnChange?.[col.name] === true &&
                              inputIsValid[col.name] === false && (
                                <ErrorMessage subtitle={inputsErrorMessages?.[col.name]} />
                              )}
                            {inputIsValid[col.name] === false && !isError?.[col.name] && (
                              <ErrorMessage subtitle={inputsErrorMessages?.[col.name]} />
                            )}
                          </>
                        ),
                        textarea: (
                          <div className="textarea-container">
                            <textarea
                              className={`sf-form-input ${
                                inputIsValid[col.name] === false ||
                                (isError?.[col.name]?.length > 0 && inputsOnChange?.[col.name] === null)
                                  ? 'error'
                                  : ''
                              }`}
                              autoComplete="on"
                              type="text"
                              name={col.name}
                              value={inputs[col?.name] || ''}
                              onChange={handleChange}
                              readOnly={col.readOnly}
                              disabled={col.readOnly}
                              placeholder={col.placeholder || 'Type here'}
                              onBlur={() => checkInputValidation(col.name)}
                              isrequired={`${col.isrequired}`}
                            />
                            <p>{inputs[col?.name]?.length}/300</p>
                            {isError?.[col.name] && inputsOnChange?.[col.name] === null && (
                              <ErrorMessage subtitle={isError?.[col.name]} />
                            )}
                            {isError?.[col.name] &&
                              inputsOnChange?.[col.name] === true &&
                              inputIsValid[col.name] === false && (
                                <ErrorMessage subtitle={inputsErrorMessages?.[col.name]} />
                              )}
                            {inputIsValid[col.name] === false && !isError?.[col.name] && (
                              <ErrorMessage subtitle={inputsErrorMessages?.[col.name]} />
                            )}
                          </div>
                        ),
                        date: (
                          <>
                            <input
                              className={`sf-form-input ${
                                inputIsValid[col.name] === false ||
                                (isError?.[col.name]?.length > 0 && inputsOnChange?.[col.name] === null)
                                  ? 'error'
                                  : ''
                              }`}
                              type="date"
                              name={col.name}
                              value={inputs[col?.name] || ''}
                              onChange={handleChange}
                              readOnly={col.readOnly}
                              onBlur={() => checkInputValidation(col.name)}
                              isrequired={`${col.isrequired}`}
                            />
                            {isError?.[col.name] && inputsOnChange?.[col.name] === null && (
                              <ErrorMessage subtitle={isError?.[col.name]} />
                            )}
                            {isError?.[col.name] &&
                              inputsOnChange?.[col.name] === true &&
                              inputIsValid[col.name] === false && (
                                <ErrorMessage subtitle={inputsErrorMessages?.[col.name]} />
                              )}
                            {inputIsValid[col.name] === false && !isError?.[col.name] && (
                              <ErrorMessage subtitle={inputsErrorMessages?.[col.name]} />
                            )}
                          </>
                        ),
                      }[col.type]
                    }
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </StyledDiv>
  )
}

export const StyledDiv = styled.div`
  .textarea-container {
    display: flex;
    flex-direction: column;

    textarea {
      border-radius: 4px;
      min-height: 223px;
      height: 100%;
      padding: 11px 15.5px;
    }
    p {
      align-self: end;
    }
  }

  .question-icon {
    margin-top: -0.25rem;
  }

  .color-error {
    color: ${({ theme }) => theme.colors.error};
  }

  .sf-staff-info__btns {
    display: flex;
    justify-content: flex-end;
    margin-top: auto;

    button {
      max-width: 200px;
      margin-left: 30px;
    }
  }

  .sf-staff-info__form {
    display: flex;
    flex-direction: column;
 

    .sf-staff-info__row {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 16px 0;
      flex-wrap: wrap;

      @media only screen and (min-width: 768px) {
        flex-direction: row;
      }

      .sf-input-container {
        width: 100%;
        margin-bottom: 20px;

        @media only screen and (min-width: 768px) {
          width: 48.5%;
        }
      }
    }
  }
`
