import styled from 'styled-components'

export default styled.div`
  background-color: #f0f1f3;
  height: 1px;
  margin: 10px 0;

  @media only screen and (min-device-width: 568px) and (max-device-width: 915px) and (orientation: landscape) {
    height: 0;
    margin: 0;
  }
`
