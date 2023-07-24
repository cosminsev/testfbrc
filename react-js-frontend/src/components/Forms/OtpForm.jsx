import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect, createRef } from 'react'
import { openModal, closeModal } from 'features/modal/modalSlice'
import { setVerifySmsError, verifySms } from 'features/activateAccount/activateAccountSlice'
import { getStateFromServer } from 'features/activateAccount'
import FormTitle from 'components/form-title'
import { Button } from 'components/Buttons'
import styled from 'styled-components'

const OtpForm = () => {
  const { childrenProps } = useSelector((state) => state.modalReducer)
  const userId = useSelector((state) => state.authReducer.id)
  const { code, isError } = useSelector((state) => state.activateAccount)
  const [otp, setOtp] = useState(new Array(4).fill(''))

  const [iscodesent, setiscodeSent] = useState(false)
  const [displaymessage, setDisplaymessage] = useState(false)

  const otpInputRefs = Array(4)
    .fill('')
    .map(() => createRef())

  const dispatch = useDispatch()

  const handleOtpChange = (elementIndex, event) => {
    setOtp([...otp.map((d, index) => (index === elementIndex ? event.target.value : d))])
    if (event.target.value !== '' && elementIndex < otp.length - 1) {
      otpInputRefs[elementIndex + 1].current.focus()
    }
  }

  const handleOtpKeyDown = (elementIndex, event) => {
    if (event.key === 'Backspace' && !event.target.value && elementIndex > 0 && elementIndex === 3) {
      otpInputRefs[elementIndex - 1].current.focus()
    }
  }

  useEffect(() => {
    dispatch(getStateFromServer(userId))
    if (iscodesent) {
      setDisplaymessage(true)

      if (code?.is_verified) {
        setTimeout(() => {
          dispatch(closeModal())
        }, 500)
      }
    }
  }, [code])

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    const code = otp.join('')
    try {
      const response = await dispatch(
        verifySms({
          code: code,
          user_id: userId,
        }),
      )
      if (response?.error) {
        dispatch(setVerifySmsError(response?.payload?.message))
      } else {
        setiscodeSent(true)
      }
    } catch (error) {
      if (error && error.message) console.log(error)
    }
  }

  return (
    <div onClick={closeModal}>
      {openModal && (
        <form onSubmit={handleOtpSubmit}>
          {isError ? (
            <StyledOtpError>
              <div className="otp-error-message">{isError}</div>
            </StyledOtpError>
          ) : null}
          <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
            <FormTitle formTitle={childrenProps.title} hasSubtitle={childrenProps.subtitle} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
            {otp.map((digit, i) => (
              <div key={i}>
                <div style={{ display: 'inline-block' }}>
                  <input
                    name="digit"
                    style={{
                      width: '50px',
                      height: '50px',
                      fontSize: '30px',
                      textAlign: 'center',
                      lineHeight: '50px',
                      fontFamily: 'Raleway, sans-serif',
                      outline: '0',
                      padding: '0',
                      borderRadius: '0',
                      borderWidth: '0 0 3px',
                      borderBottomColor: '#6D757',
                      margin: '6px 6px 6px 6px',
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="\d{1}"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    ref={otpInputRefs[i]}
                  />
                </div>
              </div>
            ))}
          </div>
          <div style={{ justifyContent: 'center', textAlign: 'center', alignContent: 'center' }}>
            <div style={{ display: 'inline-block', margin: '20px 0 20px 0' }}>
              <Button size="large" type="submit">
                Validate
              </Button>
            </div>
            <div>
              <p style={{ color: '#121212', fontWeight: 600, fontSize: '18px' }}>{childrenProps.caption}</p>
            </div>
            <div>
              <p
                onClick={closeModal}
                style={{
                  display: 'inline-block',
                  color: '#6d757d',
                  fontWeight: 600,
                  fontSize: '14px',
                  padding: '12px',
                  cursor: 'pointer',
                }}
              >
                {childrenProps.subButton}
              </p>

              {displaymessage ? (
                <div>
                  {' '}
                  <p
                    style={{
                      display: 'inline-block',
                      color: code?.is_verified ? '#11c711' : '#e60100',
                      fontWeight: 600,
                      fontSize: '14px',
                      padding: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    The One-Time Code is {code?.is_verified ? 'Valid' : 'Invalid'}
                  </p>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default OtpForm

const StyledOtpError = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1060px;
  text-align: center;

  .otp-error-message {
    color: ${({ theme }) => theme.colors.stateError};
    font-size: 18px;
    font-weight: 600;
  }
`
