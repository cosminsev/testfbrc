import styled from 'styled-components'

export const Checkbox = ({ name, id, label, checked, readOnly, disabled, onChangeHandler, gap, ...extraProps }) => {
  return (
    <StyledLabel gap={gap} className="sf-thin-text sf-checkboxes-input m-0" {...extraProps} disabled={disabled}>
      <input name={name} type="checkbox" checked={checked} id={id} readOnly={readOnly} onChange={onChangeHandler} disabled={disabled} />
      <div className="sf-custom-checkbox-input"></div>

      {label}
    </StyledLabel>
  )
}

export const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ gap }) => gap || '0.5em'};
  white-space: nowrap;
  padding-bottom: 20px;

  @media (min-width: 768px) {
    padding-bottom: 0;
  }

  > div {
    margin: 0;
  }

  &[disabled] {
    opacity: 0.5;
  }
`
