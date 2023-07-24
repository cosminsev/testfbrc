import styled, { keyframes } from 'styled-components'
import { useState, useEffect } from 'react'
import { ReactComponent as FilterIcon } from 'assets/icons/FilterSign.svg'
import { ReactComponent as Placeholder } from 'assets/icons/Accounts.svg'
import { ReactComponent as DollarSign } from 'assets/icons/newIcons/Dollar.svg'
import { ReactComponent as StatusSign } from 'assets/icons/newIcons/Documents.svg'
import { ReactComponent as DateSign } from 'assets/icons/Calendar.svg'
import CustomDivider from '../Divider'
import { CheckboxList } from './CheckboxList'
import { RangeSlider } from './RangeSlider'
import { Date } from './Date'

export const CustomFilterNew = ({
  isDisabled,
  optionsList,
  setOptionsList,
  setAppliedOptions,
  appliedOptions,
  handleApplyFilter,
}) => {
  const [dropdownOpen, setDropDownOpen] = useState(false)

  const [selectedType, setSelectedType] = useState(null)
  const [kkkey, setKkkey] = useState(null)
  const [activeIndex, seetActiveIndex] = useState(null)

  const removeUnderline = (string) => {
    if (typeof string !== 'string') return
    return string.replaceAll('_', ' ')
  }

  useEffect(() => {
    if (Object.keys(appliedOptions).length > 0) {
      handleApplyFilter(appliedOptions)
    }
  }, [appliedOptions, handleApplyFilter])

  const handleOptionsListChange = (e) => {
    const { checked } = e.target
    const [filter, option] = e.target.name.split('-')
    setOptionsList((state) => {
      const updatedFilter = state[filter].options.map((curOption) => {
        if (curOption.name === option) {
          curOption.checked = checked
        }
        return curOption
      })
      return { ...state, [filter]: { ...state[filter], updatedFilter } }
    })
  }

  const handleSliderChange = (value, filterKey) => {
    setOptionsList((state) => ({
      ...state,
      [filterKey]: { ...state[filterKey], value },
    }))
  }

  const applyFilterOptions = (optionsList) => {
    const activeFilters = {}
    Object.keys(optionsList).forEach((key) => {
      const filter = optionsList[key]
      // If we have a range filter and we changed at least one of the options
      if (filter.type === 'range' && (filter.value[0] !== filter.min || filter.value[1] !== filter.max)) {
        activeFilters[key] = filter.value
      } else if (['options', 'customOptions'].includes(filter.type)) {
        activeFilters[key] = filter.options.filter((option) => option.checked).map((option) => option.name)
      } else if (filter.type === 'dateRange') {
        activeFilters[key] = []
        if (filter.values.min) activeFilters[key][0] = filter.values.min
        if (filter.values.max) activeFilters[key][1] = filter.values.max
      }
    })
    setAppliedOptions(activeFilters)
    setDropDownOpen(false)
  }

  const handleDateRangeChange = (filter, prop, value) => {
    setOptionsList((state) => ({
      ...state,
      [filter]: {
        ...state[filter],
        values: { ...state[filter].values, [prop]: value },
      },
    }))
  }

  const condRender = (type) => {
    console.log(selectedType)
    if (type === 'options')
      return (
        <div className="selected_filter_option">
          <CheckboxList options={selectedType?.options} propName={kkkey} handleChange={handleOptionsListChange} />
        </div>
      )
    if (type === 'range') {
      return (
        <div className="selected_filter_option">
          <RangeSlider
            min={selectedType?.min}
            max={selectedType?.max}
            handleChange={(value) => handleSliderChange(value, kkkey)}
            valuePrefix={selectedType?.valuePrefix}
            value={selectedType?.value}
          />
        </div>
      )
    }
    if (type === 'dateRange') {
      return (
        <>
          <Date
            label="After"
            name={`${kkkey}-min`}
            value={optionsList[kkkey]?.values?.min}
            min={optionsList[kkkey]?.min}
            handleChange={(e) => handleDateRangeChange(kkkey, 'min', e.target.value)}
          />
          <Date
            label="Before"
            name={`${kkkey}-max`}
            value={optionsList[kkkey]?.values?.max}
            min={optionsList[kkkey]?.values?.min || optionsList[kkkey]?.min}
            handleChange={(e) => handleDateRangeChange(kkkey, 'max', e.target.value)}
          />
        </>
      )
    }
  }

  return (
    <Div>
      <div className="sf-filter-dropdown__container gnmarket">
        <button
          className={`sf-filter-btn${dropdownOpen ? ' opened' : ''}${isDisabled ? ' disabled' : ''}`}
          onClick={() => setDropDownOpen(!dropdownOpen)}
          data-display="static"
        >
          <FilterIcon /> Add filter
        </button>
        <div
          className={`sf-filter-dropdown__filter-section sf-checkbox-list_alignment ${
            !dropdownOpen ? 'hidden' : 'visible'
          }`}
        >
          <p className="sf-filter-title">Filter</p>
          <CustomDivider />

          <div className="btnsContainer gap-2 mb-3">
            {Object.keys(optionsList).map((filterKey, i) => {
              const filter = optionsList[filterKey]
              return (
                <button
                  onClick={() => {
                    setSelectedType(filter)
                    setKkkey(filterKey)
                    seetActiveIndex(i)
                  }}
                  className={activeIndex === i ? 'actBtn' : ''}
                  key={i}
                >
                  {i === 0 ? <Placeholder /> : null}
                  {i === 1 ? <DollarSign /> : null}
                  {i === 2 ? <StatusSign /> : null}
                  {i === 3 ? <DateSign /> : null}
                  <span>{optionsList[filterKey]?.label || removeUnderline(filterKey)}</span>
                </button>
              )
            })}
          </div>
          {selectedType && (
            <>
              {/* <div className="selected_filter_option">
                <CheckboxList options={selectedType?.options} propName={kkkey} handleChange={handleOptionsListChange} />
              </div> */}
              {condRender(selectedType.type)}
              <CustomDivider />
              <div className="sf-buttons-container__container">
                <button className="save" onClick={() => applyFilterOptions(optionsList)}>
                  Apply
                </button>
                <button className="cancel" onClick={() => setDropDownOpen(!dropdownOpen)}>
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Div>
  )
}

const sweep = keyframes`
  0%    {opacity: 0}
  100%  {opacity: 1}
`

const Div = styled.div`
  width: 100%;
  min-width: 0;
  align-items: center;
  gap: 0.75rem;

  .btnsContainer {
    display: flex;
    flex-wrap: wrap;
    min-width: 250px;
  }
  .btnsContainer > button {
    flex: 45%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    font-size: ${({ theme }) => theme.typography.p};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    letter-spacing: 0.75px;
    text-transform: capitalize;
    gap: 1rem;
  }
  .btnsContainer > button > svg {
    width: 45px;
    height: 45px;
  }
  .selected_filter_option {
    max-height: 220px;
    overflow-y: overlay;
    overflow-x: hidden;
    animation: ${sweep} 0.3s linear;
  }
  .actBtn {
    /* fill: #e60100; */
    background-color: rgba(230, 1, 0, 0.15);
  }
  .actBtn:nth-of-type(2) > svg,
  .actBtn:nth-of-type(3) > svg {
    stroke: #e60100;
    fill: #e60100;
  }
  .actBtn > svg > path {
    stroke: #e60100;
  }
`
