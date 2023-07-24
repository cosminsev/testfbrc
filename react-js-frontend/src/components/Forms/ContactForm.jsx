import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
// styles and assets
import CaretDown from 'assets/icons/CaretDown.svg'
import CaretUp from 'assets/icons/CaretUp.svg'
import { ConfirmationModal, ErrorMessage } from 'components'
import { setErrors } from 'features/organizations'
import { useDispatch, useSelector } from 'react-redux'
import { PhonePrefixSelect } from './PhonePrefixSelect'
// components

export const ContactForm = ({
  updateHandler,
  deleteHandler,
  contact,
  index,
  fields,
  itemsNumber,
  isError,
  hideDelete = false,
}) => {
  //global state
  const { errors } = useSelector((state) => state.organizations)

  //utils
  const listInputsValidation = {}
  const dispatch = useDispatch()

  fields.forEach((input) => {
    listInputsValidation[input.name] = null
  })

  const [inputIsValid, setInputIsValid] = useState(listInputsValidation)

  useEffect(() => {
    if (errors?.[index]?.contact_role?.[0] === '"" is not a valid choice.')
      dispatch(setErrors({ ...errors, [index]: { ...errors?.[index], contact_role: ['Please chose a valid option'] } }))
  }, [errors, dispatch, index])

  // handlers
  const handleChange = (e) => {
    if (e.target.type === 'text' && e.target.type === 'number') {
      updateHandler(
        { ...contact, [e.target.name]: e.target.value.length < 60 ? e.target.value : contact?.[e.target.name] },
        index,
      )
    } else {
      updateHandler({ ...contact, [e.target.name]: e.target.value }, index)
    }
  }

  const sentData = (name) => {
    const thisInput = fields.find((input) => input.name === name)
    if (thisInput.validation) {
      setInputIsValid({
        ...inputIsValid,
        [thisInput.name]: thisInput.validation(contact[name]),
      })
    } else {
      setInputIsValid({ ...inputIsValid, [thisInput.name]: true })
    }
  }

  const handleDelete = () => {
    deleteHandler(contact.id)
  }

  return (
    <StyledDetails open iconsSrc={{ open: CaretUp, closed: CaretDown }}>
      <summary>
        <span>
          {contact.first_name} {contact.last_name} {contact.contact_role ? `- ${contact.contact_role}` : ''}
        </span>
      </summary>

      <div className="grid-container">
        {fields.map((field) => {
          return {
            text: (
              <div className="input-container" key={`${field.name}`}>
                <label htmlFor={`${field.name}`}>
                  {field.label} {field.isRequired && <span className="text-error">*</span>}
                </label>
                <input
                  maxLength={60}
                  className={`${inputIsValid[field.name] === false || isError?.[field.name]?.length ? 'error' : ''}`}
                  type="text"
                  onChange={handleChange}
                  onBlur={() => sentData(field.name)}
                  name={`${field.name}`}
                  value={contact[field.name] || ''}
                  placeholder={field.placeholder || 'Type here'}
                />
                {isError?.[field.name] && <ErrorMessage subtitle={isError?.[field.name]} />}
              </div>
            ),
            phone: (
              <div className="input-container" key={`${field.name}`}>
                <label htmlFor={`${field.name}`}>
                  {field.label} {field.isRequired && <span className="text-error">*</span>}
                </label>

                <div className="multiple-inputs">
                  <PhonePrefixSelect
                    field={field}
                    value={contact[field.prefixName]}
                    handleChange={handleChange}
                    className={`${inputIsValid[field.name] === false || isError?.[field.name]?.length ? 'error' : ''}`}
                  />
                  <input
                    className={`${inputIsValid[field.name] === false || isError?.[field.name]?.length ? 'error' : ''}`}
                    type="number"
                    onChange={handleChange}
                    onBlur={() => sentData(field.name)}
                    onKeyDown={(evt) => ['e', 'E', '+', '-', '.'].includes(evt.key) && evt.preventDefault()}
                    onWheel={(e) => e.target.blur()}
                    name={`${field.name}`}
                    value={contact[field.name] || ''}
                    placeholder={field.placeholder || 'Type here'}
                  />
                </div>
                {isError?.[field.name] && <ErrorMessage subtitle={isError?.[field.name]} />}
              </div>
            ),
            select: (
              <div className="input-container" key={`${contact.id}-${field.name}`}>
                <label>
                  {field.label} {field.isRequired && <span className="text-error">*</span>}
                </label>
                <select
                  name={`${field.name}`}
                  className={`${inputIsValid[field.name] === false || isError?.[field.name]?.length ? 'error' : ''}`}
                  onChange={handleChange}
                  value={contact[field.name] || ''}
                  onBlur={() => sentData(field.name)}
                >
                  <option value="">{field.placeholder || '--- Choose role ---'}</option>
                  {field.options?.map((option, i) => {
                    return (
                      <option value={option.value} key={i}>
                        {option.title}
                      </option>
                    )
                  })}
                </select>
                {isError?.[field.name] && <ErrorMessage subtitle={isError?.[field.name]} />}
              </div>
            ),
          }[field.type]
        })}
      </div>
      <div className="actions">
        {!hideDelete && (
          <ConfirmationModal
            title="Remove contact"
            message="Are you sure you want to delete this contact?"
            togglerButtonClassName="sf-button-only-text d-flex align-items-center justify-content-center"
            togglerMessage="Delete Contact"
            buttonConfirmMessage="Delete"
            confirmHandler={handleDelete}
          />
        )}
      </div>
    </StyledDetails>
  )
}

const sweep = keyframes`
  0%    {opacity: 0}
  100%  {opacity: 1}
`

export const StyledDetails = styled.details`
  background-color: ${({ theme }) => theme.colors.neutralRegularGrey};
  border-radius: 8px;
  padding: 17px 20px;
  margin-bottom: 10px;

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(768px, 100%), 1fr));
    grid-auto-rows: 1fr;
    margin-top: 1em;
    gap: 1em;
    overflow: visible;

    @media only screen and (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: 1fr;
      margin-top: 1em;
      gap: 2.3em;
    }

    > p {
      grid-column: 1 / span 2;
    }

    .input-container {
      display: flex;
      flex-direction: column;
      font-size: ${({ theme }) => theme.typography.p};

      label {
        font-weight: ${({ theme }) => theme.fontWeight.bold};
        color: ${({ theme }) => theme.colors.primaryBlack};
        line-height: 1em;
        margin-bottom: 0.5em;
      }

      > input,
      > select {
        padding: 0.75em 1em;
        color: ${({ theme }) => theme.colors.neutralDarkGrey};
      }

      select {
        background-position: 95% center;
      }

      .multiple-inputs {
        display: flex;
        align-items: center;
        gap: 1em;

        > input:last-child {
          width: 100%;
        }
      }
    }
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    align-self: flex-end;
    padding: 1rem 1.5rem;
  }

  summary {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: ${({ theme }) => theme.typography.p};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    line-height: 24px;
    letter-spacing: 0.75px;
    color: ${({ theme }) => theme.colors.primaryBlack};
    list-style: none;
    padding: 0;

    &::-webkit-details-marker {
      display: none;
    }
  }

  & > summary::after {
    content: url(${({ iconsSrc }) => iconsSrc.closed});
    height: 24px;
  }

  &[open] > summary::after {
    content: url(${({ iconsSrc }) => iconsSrc.open});
  }

  &[open] summary ~ * {
    animation: ${sweep} 0.3s linear;
  }
`
