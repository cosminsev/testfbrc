import styled from 'styled-components'

export const Radio = ({ name, label, checked, disabled, onChangeHandler, gap, ...extraProps }) => {

  return (
    <StyledLabel gap={gap} className="sf-thin-text sf-checkboxes-input m-0" {...extraProps}>
      <input
        id={name}
        name={name}
        type="radio"
        checked={checked}
        onChange={onChangeHandler}
        disabled={disabled}
      />
       <div className='sf-custom-radio-input'>
         <span></span>
       </div>

      {label}
    </StyledLabel>
  )
}

export const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ gap }) => gap || '0.5em'};

  > div {
    margin: 0;
  }
`
