import styled from 'styled-components'
import ReactSlider from 'react-slider'
import { numberWithCommas } from 'utils'

interface IProps {
  min: number
  max: number
  valuePrefix?: string
  value: [number, number]
  handleChange: (values: [number, number]) => void
}

export const RangeSlider = ({ min, max, valuePrefix, value, handleChange }: IProps) => {
  const handleUpdate = (values: [number, number]) => {
    handleChange(values)
  }

  return (
    <Div>
      <div className="values">
        <span>
          {numberWithCommas(value[0])}
          {valuePrefix}
        </span>
        <span>
          {numberWithCommas(value[1])}
          {valuePrefix}
        </span>
      </div>

      <ReactSlider
        className="slider pb-2"
        thumbClassName="thumb"
        trackClassName="track"
        value={value}
        ariaLabel={['Lower thumb', 'Upper thumb']}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        renderThumb={(props) => <div {...props} />}
        pearling
        min={min}
        max={max}
        step={0.1}
        minDistance={0}
        onChange={handleUpdate}
      />
    </Div>
  )
}

const Div = styled.div`
  .values {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0.5rem;
  }

  .slider {
    display: flex;
    align-items: center;
  }

  .track {
    background: #f0f1f3;
    border-radius: 4px;
    height: 8px;

    &.track-1 {
      background: #29578a;
      border-radius: 4px;
    }
  }

  .thumb {
    width: 16px;
    height: 16px;
    background: #29578a;
    border: 0.5px solid #1c4471;
    box-sizing: border-box;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
  }
`
