import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { ErrorMessage } from 'components'

const ComplianceForm = ({ fields, initialValues, submit, isError }) => {
  const listInputsGroupTextValidation = {}
  const groupTextField = []

  fields.forEach((item) => {
    if (item.type === 'groupInputs') {
      item.inputs.forEach((elem) => {
        groupTextField.push(elem)
      })
    } else if (item.type === 'textarea') {
      groupTextField.push(item)
    }
  })

  groupTextField.forEach((input) => {
    listInputsGroupTextValidation[input.name] = null
  })

  // local state
  const [inputs, setInputs] = useState(initialValues)
  const [inputGroupTextIsValid, setGroupTextIsValid] = useState({
    ...listInputsGroupTextValidation,
  })
  const [atLeastAIPS] = useState(null)

  // Only for mandatory checkboxes group
  // const checkGroupItems = [
  //   { value: inputs.isp_aol_used },
  //   { value: inputs.isp_charter_used },
  //   { value: inputs.isp_comcast_used },
  //   { value: inputs.isp_gmail_used },
  //   { value: inputs.isp_other_used },
  //   { value: inputs.isp_verizon_used },
  //   { value: inputs.yahoo_isp_used },
  // ]

  // const isValidMandatoryChecks = checkGroupItems.some((input) => input.value)

  // effects
  useEffect(() => {
    submit.handler(inputs)
  }, [inputs, submit])

  // handlers
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const handleCheckBoxChange = (e) => {
    setInputs((state) => ({
      ...state,
      [e.target.name]: !e.target.defaultChecked,
    }))
  }

  const checkInputGroupTextValidation = (name) => {
    const thisFields = []
    fields.forEach((item) => {
      if (item.type === 'groupInputs') {
        item.inputs.forEach((elem) => {
          thisFields.push(elem)
        })
      } else if (item.type === 'textarea') {
        thisFields.push(item)
      }
    })
    const thisField = thisFields.find((field) => field.name === name)
    if (thisField.validation) {
      setGroupTextIsValid({
        ...inputGroupTextIsValid,
        [thisField.name]: thisField.validation(inputs[thisField.name]),
      })
    } else {
      setGroupTextIsValid({ ...inputGroupTextIsValid, [thisField.name]: true })
    }
  }

  return (
    <StyledDiv>
      <div className="sf-staff-info__form">
        {fields?.map((item, index) => {
          return (
            <div key={index}>
              {
                {
                  checkbox: (
                    <label className="sf-thin-text sf-checkboxes-input">
                      <input
                        type={item.type}
                        name={item.name}
                        defaultChecked={inputs[item.name] || false}
                        onChange={(event) => handleCheckBoxChange(event)}
                      />
                      <div className="sf-custom-checkbox-input"></div>
                      {item.label}
                      {item.mandatory && <span className="sf-mandatory-field">*</span>}
                    </label>
                  ),
                  groupInputs: (
                    <div className="sf-group-text-field__container">
                      {item.inputs?.map((input, i) => {
                        return (
                          <div className="sf-input-container" key={i}>
                            <label className="sf-form-label">
                              {input.label}
                              {input.mandatory && <span className="sf-mandatory-field">*</span>}
                            </label>
                            <input
                              className={`sf-form-input ${inputGroupTextIsValid[input.name] === false ? 'error' : ''}`}
                              autoComplete="on"
                              type={input.type}
                              name={input.name}
                              placeholder={input.placeholder}
                              defaultValue={initialValues[input.name] || ''}
                              onChange={(event) => handleChange(event)}
                              onBlur={() => checkInputGroupTextValidation(input.name)}
                            />
                            {isError?.[input.name] && <ErrorMessage subtitle={isError?.[input.name]} />}
                          </div>
                        )
                      })}
                    </div>
                  ),
                  checkboxGroup: (
                    <div className="sf-checkbox-group">
                      <label className="sf-form-label">
                        {item.label}
                        {item.mandatory && <span className="sf-mandatory-field">*</span>}
                      </label>
                      {atLeastAIPS === false && (
                        <p className="error-text sf-error-message">Must be checked an ISP at least</p>
                      )}
                      <div className="d-flex">
                        {item.options?.map((option, i) => {
                          return (
                            <label className="sf-thin-text sf-checkboxes-input" key={i}>
                              <input
                                type={option.type}
                                name={option.name}
                                defaultChecked={inputs[option.name] || false}
                                onChange={(event) => handleCheckBoxChange(event)}
                              />
                              <div className="sf-custom-checkbox-input"></div>
                              {option.label}
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  ),
                  textarea: (
                    <>
                      <div className={`sf-input-container`}>
                        <label className="sf-form-label">
                          {item.label}
                          {item.mandatory && <span className="sf-mandatory-field">*</span>}
                        </label>
                        <textarea
                          className={inputGroupTextIsValid[item.name] === false ? 'error' : ''}
                          name={item.name}
                          placeholder={item.placeholder}
                          defaultValue={initialValues[item.name] || ''}
                          onChange={(event) => handleChange(event)}
                          onBlur={() => checkInputGroupTextValidation(item.name)}
                        ></textarea>
                      </div>
                      {isError?.[item.name] && <ErrorMessage subtitle={isError?.[item.name]} />}
                    </>
                  ),
                }[item.type]
              }
            </div>
          )
        })}
      </div>
    </StyledDiv>
  )
}

export const StyledDiv = styled.div`
  max-height: 500px;
  overflow-x: hidden;
  overflow-y: auto;
  padding-right: 30px;

  .sf-staff-info__btns {
    display: flex;
    justify-content: flex-end;

    button {
      max-width: 200px;
      margin-left: 30px;
    }
  }

  .sf-staff-info__row {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;

    .sf-input-container {
      width: 48.5%;
      margin: 0;
    }
  }

  .sf-checkbox-group {
    .sf-checkboxes-input {
      margin-right: 10px;
    }
  }
  textarea {
    border-radius: 4px;
    min-height: 107px;
    height: 100%;
    padding: 11px 15.5px;
  }

  .sf-mandatory-field {
    color: #e60100;
  }

  .sf-group-text-field__container {
    display: grid;
    grid-template-columns: 50% 50%;
    column-gap: 25px;
  }
`

export default ComplianceForm
