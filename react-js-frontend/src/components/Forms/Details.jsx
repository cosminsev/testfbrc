import styled, { keyframes } from 'styled-components'
// styles and assets
import CaretUp from '../../assets/icons/CaretUp.svg'
import CaretDown from '../../assets/icons/CaretDown.svg'

export const Details = ({ summaryText, open, children }) => {
  return (
    <StyledDetails open={open} iconsSrc={{ open: CaretUp, closed: CaretDown }}>
      <summary>{summaryText}</summary>
      {children}
    </StyledDetails>
  )
}

// sf-thin-text text-capitalize
const sweep = keyframes`
  0%    {opacity: 0}
  100%  {opacity: 1}
`

export const StyledDetails = styled.details`
  summary {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: ${({ theme }) => theme.typography.p};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    letter-spacing: 0.75px;
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.secondaryBlue};
    list-style: none;

      &::-webkit-details-marker {
        display: none;
      }
    }
  }

  & > summary::after {
    content: url(${({ iconsSrc }) => iconsSrc.closed});
  }

  &[open] > summary::after {
    content: url(${({ iconsSrc }) => iconsSrc.open});
  }

  &[open] summary ~ * {
    max-height: 220px;
    overflow-y: overlay;
    overflow-x: hidden;
    animation: ${sweep} .3s linear;
`
