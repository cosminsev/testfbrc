import { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ErrorMessage, LoadingAnimation } from 'components'
import { PhonePrefixSelect } from './PhonePrefixSelect'

import { Button } from 'components'
import {
  updateInfo,
  sendSms,
  setPersonalInfo,
  setProgress,
  setStep,
  setSection,
  setUpdateInfoError,
  // getStateFromServer,
} from 'features/activateAccount/activateAccountSlice'
import styled from 'styled-components'

export const ActivationForm = ({ fields, openModalHandler, isLoading, isError }) => {
  const blocksmstime = 50
  const userId = useSelector((state) => state.authReducer.id)
  const { personalInfo} = useSelector((state) => state.activateAccount)
  const [sendsmsdisabled, setsmsDisabled] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [currentYear] = useState(new Date().getFullYear())
  // Get the current date
  const currentDate = new Date()
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0')
  const currentDay = String(currentDate.getDate()).padStart(2, '0')
  const maxDate = `${currentYear - 18}-${currentMonth}-${currentDay}`

  const dispatch = useDispatch()

  // local state
  const [inputIsValid] = useState({})
  const [inputsOnChange] = useState({})

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setsmsDisabled(false)
    }
  }, [countdown])

  useEffect(() => {
    const allfieldsnames = fields.map((item) => item.name)
    const numSelectedValues = Object.keys(personalInfo).filter(
      (key) => allfieldsnames.includes(key) && personalInfo[key],
    ).length

    const newProgress = numSelectedValues * 20
    const stepsLeft = 5 - numSelectedValues
    let stepText
    let sectionText
    switch (stepsLeft) {
      case 1:
        stepText = 'One Step Left!'
        sectionText = 'only one section to complete'
        break
      case 2:
        stepText = 'Two Steps Left!'
        sectionText = 'only two sections to complete'
        break
      case 3:
        stepText = 'Three Steps Left!'
        sectionText = 'three sections to complete'
        break
      case 4:
        stepText = 'Four Steps Left!'
        sectionText = 'four sections to complete'
        break
      case 5:
        stepText = 'Five Steps Left!'
        sectionText = 'five sections to complete'
        break
      default:
        stepText = 'Completed all steps!'
        sectionText = 'completed all sections'
    }
    dispatch(setStep(stepText))
    dispatch(setSection(sectionText))
    dispatch(setProgress(newProgress))
  }, [fields, dispatch, personalInfo])

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target
      dispatch(setPersonalInfo({ name, value }))
    },
    [dispatch],
  )

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target
      dispatch(setPersonalInfo({ name, value }))
    },
    [dispatch],
  )

  const handleVerification = async () => {
    openModalHandler()

    await dispatch(
      sendSms({
        phone_number: personalInfo?.phone,
        phone_prefix: personalInfo?.phone_prefix,
        user_id: userId,
      }),
    )
    setsmsDisabled(true)
    setCountdown(blocksmstime)
  }

  const handleActivate = async (e) => {
    e.preventDefault()

    try {
      const response = await dispatch(
        updateInfo({
          id: userId,
          personalInfo: personalInfo,
        }),
      )
      if (response?.error) dispatch(setUpdateInfoError(response?.payload?.message))
    } catch (error) {
      if (error && error.message) console.log(error)
    }
  }

  return (
    <div>
      <form className="form-wrapper" onSubmit={handleActivate}>
        <div>
          {isError ? (
            <StyledActivateError>
              <div className="activate-error-message">{isError}</div>
            </StyledActivateError>
          ) : null}
          <div className="form-container">
            {fields?.map((field) => (
              <div key={field.name} className="form-rows">
                <label htmlFor={field.name} className="sf-form-label d-flex align-items-center gap-1 form-label">
                  {field.label}
                </label>
                {
                  {
                    date: (
                      <>
                        <div className="form-input-container">
                          <input
                            className="form-input"
                            type="date"
                            name={field.name}
                            defaultValue={field.value || ''}
                            onChange={handleChange}
                            onWheel={(e) => e.target.blur()}
                            max={maxDate}
                          />
                          {isError?.[field.name] && <ErrorMessage subtitle={isError?.[field.name]} />}
                        </div>
                      </>
                    ),
                    select: (
                      <div className="form-input-container">
                        <select
                          className={`selectpicker sf-form-input form-input ${
                            inputIsValid[field.name] === false ||
                            (isError?.[field.name]?.length > 0 && inputsOnChange?.[field.name] === null)
                              ? 'error'
                              : ''
                          }`}
                          name={`${field.name}`}
                          type="select"
                          value={field.value || ''}
                          onChange={handleChange}
                          isrequired={`${field.isrequired}`}
                        >
                          <option value="">{`--- ${field.placeholder} ---`}</option>
                          {field?.options?.map((option, inx) => {
                            return (
                              <option value={option.value} key={inx}>
                                {option.title}
                              </option>
                            )
                          })}
                        </select>
                        {isError?.[field.name] && inputsOnChange?.[field.name] === null && (
                          <ErrorMessage subtitle={isError?.[field.name]} />
                        )}
                        {inputIsValid[field.name] === false && !isError?.[field.name] && (
                          <ErrorMessage subtitle={field.errorMessage} />
                        )}
                      </div>
                    ),
                    phone: (
                      <div key={`${field.name}`} className="form-phone-wrapper">
                        <div className="multiple-inputs phone-input-container">
                          <div className="phone-prefix">
                            <PhonePrefixSelect
                              field={field}
                              name={field.prefixName}
                              value={field.phone_prefix}
                              handleChange={handleInputChange}
                              className={`${
                                inputIsValid[field.name] === false || isError?.[field.name]?.length ? 'error' : ''
                              }`}
                            />
                          </div>
                          <input
                            className={`phone-input ${
                              inputIsValid[field.name] === false || isError?.[field.name]?.length ? 'error' : ''
                            }`}
                            type="number"
                            onChange={handleInputChange}
                            name={field.name}
                            // value={personalInfo[field.name] || ''}
                            value={field.phone}
                            placeholder={field.placeholder || 'Type here'}
                          />
                        </div>
                        {isError?.[field.name] && <ErrorMessage subtitle={isError?.[field.name]} />}
                      </div>
                    ),
                  }[field.type]
                }
                {field.type !== 'none' ? (
                  <span className="form-validation">
                    {field.value ? (
                      <p className="completed">Completed</p>
                    ) : field.name === 'phone' ? (
                      <p
                        className={
                          field.phone && field.phone.length > 7 && personalInfo?.is_sms_verified
                            ? 'completed'
                            : 'incompleted'
                        }
                      >
                        {field.phone && field.phone.length > 7 && personalInfo?.is_sms_verified
                          ? 'Completed'
                          : 'Requires validation'}
                      </p>
                    ) : (
                      <p className="incompleted">Incompleted</p>
                    )}
                  </span>
                ) : (
                  <span className="form-validation"> </span>
                )}
              </div>
            ))}
          </div>
          <div>
            <span className="form-footer">
              <div
                className={
                  personalInfo?.phone &&
                  personalInfo?.phone > 6 &&
                  personalInfo?.phone_prefix &&
                  !personalInfo?.is_sms_verified &&
                  !sendsmsdisabled
                    ? 'verify-button-active'
                    : 'verify-button'
                }
                onClick={
                  personalInfo?.phone &&
                  personalInfo?.phone > 6 &&
                  personalInfo?.phone_prefix &&
                  !personalInfo?.is_sms_verified &&
                  !sendsmsdisabled
                    ? () => handleVerification(personalInfo, sendsmsdisabled)
                    : undefined
                }
              >
                Send Verification Code
                {countdown === 0 ? <div></div> : <div>Re-Send in {countdown} seconds</div>}
              </div>
            </span>
            <div className="form-button">
              <div>
                <Button size="normal" type="submit">
                  {isLoading ? <LoadingAnimation /> : 'Activate Account'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

const StyledActivateError = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1060px;
  text-align: center;

  .activate-error-message {
    color: ${({ theme }) => theme.colors.stateError};
    font-size: 18px;
    font-weight: 600;
  }
`
