import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { ReactComponent as QuestionIcon } from 'assets/icons/QuestionIcon.svg'
import { ErrorMessage } from 'components'
// import StyledTooltipTrigger from 'styles/StyledTooltipTrigger'
import { Tooltip } from 'components/Labels'

export const InfoForm = ({ fields, updateHandler, isError }) => {
  const listInputsValidation = {}
  const listInputs = {}
  const listInputsOnChange = {}
  const listInputsErrorMessages = {}
  const defaultValues = fields.reduce((cur, nex) => ({ ...cur, [nex.name]: nex.value }), {})

  fields.forEach((input) => {
    // listInputs[input.name] = ''
    listInputs[input.name] = defaultValues[input.name]
    listInputsValidation[input.name] = null
    listInputsOnChange[input.name] = null
    listInputsErrorMessages[input.name] = null
  })

  // local state
  const [inputs, setInputs] = useState(listInputs)
  const [inputIsValid, setInputIsValid] = useState(listInputsValidation)
  const [inputsOnChange, setInputsOnChange] = useState(listInputsOnChange)
  const [inputsErrorMessages, setInputsErrorMessages] = useState(listInputsErrorMessages)

  // handlers
  const handleChange = (e) => {
    if (e.target.type === 'text') {
      setInputs({ ...inputs, [e.target.name]: e.target.value.length < 60 ? e.target.value : inputs?.[e.target.name] })
    } else {
      setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
  }

  // effects
  useEffect(() => {
    if (isError) {
      setInputsOnChange(listInputsErrorMessages)
    }
  }, [isError])

  useEffect(() => {
    updateHandler(inputs)
  }, [])

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
                              defaultValue={defaultValues[col.name] || ''}
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
                              maxLength={60}
                              className={`sf-form-input ${
                                inputIsValid[col.name] === false ||
                                (isError?.[col.name]?.length > 0 && inputsOnChange?.[col.name] === null)
                                  ? 'error'
                                  : ''
                              }`}
                              autoComplete="on"
                              type="text"
                              name={col.name}
                              onKeyDown={col?.onKeyDown}
                              defaultValue={defaultValues[col.name] || ''}
                              onChange={handleChange}
                              readOnly={col.readOnly}
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
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;

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

  .sf-staff-info__row {
    /* display: flex;
    justify-content: space-between;
    margin: 15px 0; */
    display: flex;
    flex-direction: column;
    justify-content: normal;

    @media (min-width: 768px) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 15px 0;
    }

    .sf-input-container {
      /* width: 48.5%;
      margin: 0; */
      margin-bottom: 20px;
      width: 100%;

      input, select {
        box-shadow: 0 0.188rem 0.313rem 0.125rem rgba(0, 0, 0, 0.05);
      }

      @media (min-width: 768px) {
        width: 48.5%;
        margin: 0;
      }
    }
  }
`
