import { useState, useEffect, Fragment, useRef } from 'react'
import { cloneDeep } from 'lodash'
import styled from 'styled-components'
import { ReactComponent as FilterIcon } from 'assets/icons/FilterSign.svg'
import { ReactComponent as Remove } from 'assets/icons/Close.svg'
import { ReactComponent as ClearAll } from 'assets/icons/Trash.svg'
// components
import { Details, CheckboxList, RangeSlider } from 'components'
import CustomDivider from '../Divider'
import { numberWithCommas } from 'utils'

export const Filter = ({ handleApplyFilter, defaultFilters, isDisabled, filters }) => {
  // local state
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [optionsList, setOptionsList] = useState(cloneDeep(defaultFilters))
  const [appliedOptions, setAppliedOptions] = useState(filters || [])
  const filterRef = useRef()

  // effects
  useEffect(() => {
    if (Object.keys(appliedOptions).length > 0) {
      handleApplyFilter(appliedOptions)
    }
  }, [appliedOptions, handleApplyFilter])

  useEffect(() => {
    let maybeHandler = (event) => {
      const node = filterRef.current
      if (!node?.contains(event.target)) {
        if (appliedOptions.length === 0) {
          setOptionsList(cloneDeep(defaultFilters))
        }
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', maybeHandler)
    return () => {
      document.removeEventListener('mousedown', maybeHandler)
    }
  }, [])

  // handlers
  const handleChange = (e) => {
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
    setOptionsList((state) => ({ ...state, [filterKey]: { ...state[filterKey], value } }))
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
      }
    })
    setAppliedOptions(activeFilters)
    setDropdownOpen(false)
  }

  const removeFilterOption = (filterOption) => {
    const [filter, removedOption] = filterOption.split('-')

    if (defaultFilters[filter].type === 'range') {
      setOptionsList((state) => {
        const updatedFilter = {
          ...state[filter],
          value: [defaultFilters[filter].min, defaultFilters[filter].max],
        }
        return { ...state, [filter]: updatedFilter }
      })

      setAppliedOptions((state) => {
        // const updatedFilter = [defaultFilters[filter].min, defaultFilters[filter].max]

        return { ...state, [filter]: [] }
      })
    } else {
      setOptionsList((state) => {
        const updatedFilter = {
          ...state[filter],
          options: state[filter].options.map((curOption) => {
            if (curOption.name === removedOption) curOption.checked = false
            return curOption
          }),
        }
        return { ...state, [filter]: updatedFilter }
      })

      setAppliedOptions((state) => {
        const updatedFilter = state[filter].filter((selected) => selected !== removedOption)
        return { ...state, [filter]: updatedFilter }
      })
    }
  }

  const clearAllFilters = () => {
    setAppliedOptions([])
    setOptionsList(defaultFilters)
    handleApplyFilter([])
  }

  const handleDropdownState = () => {
    if (appliedOptions.length === 0) {
      setOptionsList(cloneDeep(defaultFilters))
    }
    setDropdownOpen(!dropdownOpen)
  }

  const removeUnderline = (string) => {
    if (typeof string !== 'string') return
    return string.replace('_', ' ')
  }

  // variables
  const hasActiveFilter =
    !!Object.keys(appliedOptions).length && Object.keys(appliedOptions).some((key) => !!appliedOptions[key].length)

  return (
    <Div>
      {hasActiveFilter && (
        <div className="active-filters">
          {Object.keys(appliedOptions).map(
            (key) =>
              ({
                options: appliedOptions[key].map((option, i) => {
                  return (
                    <div className="sf-filter-tag" key={i}>
                      <p>
                        <span>{key}: </span>
                        {removeUnderline(option)}
                      </p>

                      <button className="sf-invisible-btn" onClick={() => removeFilterOption(`${key}-${option}`)}>
                        <Remove />
                      </button>
                    </div>
                  )
                }),
                customOptions: appliedOptions[key].map((option, i) => {
                  return (
                    <div className="sf-filter-tag" key={i}>
                      <p>
                        <span>{key}: </span>
                        {removeUnderline(option)}
                        {console.log(appliedOptions)}
                      </p>

                      <button className="sf-invisible-btn" onClick={() => removeFilterOption(`${key}-${option}`)}>
                        <Remove />
                      </button>
                    </div>
                  )
                }),
                range: (
                  <Fragment key={key}>
                    {/* If the min or max filter is changed */}
                    {(defaultFilters[key].min !== appliedOptions[key][0] ||
                      defaultFilters[key].max !== appliedOptions[key][1]) && (
                      <div className="sf-filter-tag">
                        <p>
                          <span>
                            {`Price: ${defaultFilters[key].valuePrefix}${numberWithCommas(appliedOptions[key][0])} - ${
                              defaultFilters[key].valuePrefix
                            }${numberWithCommas(appliedOptions[key][1])}`}
                          </span>
                        </p>

                        <button className="sf-invisible-btn" onClick={() => removeFilterOption(`${key}-all`)}>
                          <Remove />
                        </button>
                      </div>
                    )}
                  </Fragment>
                ),
              }[defaultFilters[key].type]),
          )}
          <button className="sf-clear-all-filters" onClick={clearAllFilters}>
            <div className="sf-clear-icon">
              <ClearAll />
              <p>Clear</p>
            </div>
          </button>
        </div>
      )}
      <div ref={filterRef} className="sf-filter-dropdown__container">
        <button
          className={`sf-filter-btn${dropdownOpen ? ' opened' : ''}${isDisabled ? ' disabled' : ''}`}
          onClick={handleDropdownState}
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

          <div className="d-flex flex-column gap-2 mb-3">
            {Object.keys(optionsList).map((filterKey, i) => {
              const filter = optionsList[filterKey]
              return (
                <Details key={i} open={i === 0} summaryText={removeUnderline(filterKey)}>
                  {
                    {
                      range: (
                        <RangeSlider
                          min={filter?.min}
                          max={filter?.max}
                          handleChange={(value) => handleSliderChange(value, filterKey)}
                          valuePrefix={filter?.valuePrefix}
                          value={filter?.value}
                        />
                      ),
                      options: (
                        <CheckboxList options={filter?.options} propName={filterKey} handleChange={handleChange} />
                      ),
                      customOptions: (
                        <CheckboxList options={filter?.options} propName={filterKey} handleChange={handleChange} />
                      ),
                    }[filter.type]
                  }
                </Details>
              )
            })}
          </div>
          <div className="sf-buttons-container__container">
            <button className="save" onClick={() => applyFilterOptions(optionsList)}>
              Apply
            </button>
            <button className="cancel" onClick={handleDropdownState}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Div>
  )
}

const Div = styled.div`
  width: 100%;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;
  gap: 1rem 1.25rem;

  button {
    box-shadow: 0 0.188rem 0.313rem 0.125rem rgba(0, 0, 0, 0.15);
  }

  .active-filters {
    display: flex;
    align-items: center;
    gap: 1rem 1.25rem;
    height: 50px;
    width: 100%;
    overflow-x: auto;
    order: 2;
/* 
    @media only screen and (min-width: 768px) {
      position: absolute;
    } */
  }
`
