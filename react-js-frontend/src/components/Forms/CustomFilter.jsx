import { useState, useEffect, Fragment } from 'react'
import { cloneDeep } from 'lodash'
import styled from 'styled-components'
import { ReactComponent as FilterIcon } from '../../assets/icons/FilterSign.svg'
import { ReactComponent as Remove } from '../../assets/icons/Close.svg'
import { ReactComponent as ClearAll } from '../../assets/icons/Trash.svg'
// components
import { Details } from './Details'
import { CheckboxList } from './CheckboxList'


import CustomDivider from '../Tables/Divider'


export const CustomFilter = ({ handleApplyFilter, defaultFilters, isDisabled, filters }) => {
  // local state
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [optionsList, setOptionsList] = useState(cloneDeep(defaultFilters))
  const [appliedOptions, setAppliedOptions] = useState(filters || [])

  // effects
  useEffect(() => {
    if (Object.keys(appliedOptions).length > 0) {
      handleApplyFilter(appliedOptions)
    }
  }, [appliedOptions, handleApplyFilter])

  // handlers
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

  const handleDateRangeChange = (filter, prop, value) => {
    setOptionsList((state) => ({
      ...state,
      [filter]: {
        ...state[filter],
        values: { ...state[filter].values, [prop]: value },
      },
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
    } else if (defaultFilters[filter].type === 'dateRange') {
      setOptionsList((state) => {
        const updatedFilter = {
          ...state[filter],
          values: { min: '', max: '' },
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

  const removeUnderline = (string) => {
    if (typeof string !== 'string') return
    return string.replaceAll('_', ' ')
  }

  // variables
  const hasActiveFilter =
    !!Object.keys(appliedOptions).length && Object.keys(appliedOptions).some((key) => !!appliedOptions[key].length)

  return (
    <Div>
      <div className="sf-filter-dropdown__container gnmarket">
        <button
          className={`sf-filter-btn${dropdownOpen ? ' opened' : ''}${isDisabled ? ' disabled' : ''}`}
          onClick={() => setDropdownOpen(!dropdownOpen)}
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

          <div className="d-flex flex-column gap-2 mb-3">
            {Object.keys(optionsList).map((filterKey, i) => {
              const filter = optionsList[filterKey]
              return (
                <Details
                  key={i}
                  open={i === 0}
                  summaryText={optionsList[filterKey]?.label || removeUnderline(filterKey)}
                >
                  {
                    {
                      
                      options: (
                        <CheckboxList
                          options={filter?.options}
                          propName={filterKey}
                          handleChange={handleOptionsListChange}
                        />
                      ),
                      customOptions: (
                        <CheckboxList
                          options={filter?.options}
                          propName={filterKey}
                          handleChange={handleOptionsListChange}
                        />
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
            <button className="cancel" onClick={() => setDropdownOpen(!dropdownOpen)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
      {hasActiveFilter && (
        <div className="active-filters">
          {Object.keys(appliedOptions).map(
            (key) =>
              ({
                options:
                  Array.isArray(appliedOptions[key]) &&
                  appliedOptions[key]?.map((option, i) => {
                    return (
                      <div className="sf-filter-tag" key={i}>
                        <p>
                          <span>{removeUnderline(defaultFilters[key]?.label || key)}: </span>
                          {removeUnderline(option)}
                        </p>

                        <button className="sf-invisible-btn" onClick={() => removeFilterOption(`${key}-${option}`)}>
                          <Remove />
                        </button>
                      </div>
                    )
                  }),
                dateRange: (
                  <Fragment key={key}>
                    {/* If the min or max filter is changed */}
                    {(appliedOptions[key][0] || appliedOptions[key][1]) && (
                      <div className="sf-filter-tag">
                        <p>
                          <span>
                            {removeUnderline(key)}:{' '}
                            {`${appliedOptions[key][1] ? '' : 'After '}${appliedOptions[key][0] || ''}`}{' '}
                            {appliedOptions[key][1] && appliedOptions[key][0] ? (
                              <span className="text-lowercase">to</span>
                            ) : (
                              ''
                            )}{' '}
                            {`${appliedOptions[key][0] ? '' : 'Before '}${appliedOptions[key][1] || ''}`}
                          </span>
                        </p>

                        <button className="sf-invisible-btn" onClick={() => removeFilterOption(`${key}-all`)}>
                          <Remove />
                        </button>
                      </div>
                    )}
                  </Fragment>
                ),
                customOptions: appliedOptions[key].map((option, i) => {
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
              }[defaultFilters[key].type]),
          )}
          <button className="sf-clear-all-filters" onClick={clearAllFilters}>
            <div className='sf-clear-icon'>
              <ClearAll />
              <p>Clear</p>
            </div>
          </button>
        </div>
      )}
    </Div>
  )
}

const Div = styled.div`
  width: 100%;
  min-width: 0;
  align-items: center;
  gap: 0.75rem;

  button {
    box-shadow: 0 0.188rem 0.313rem 0.125rem rgba(0, 0, 0, 0.15);
  }

  .active-filters {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 1rem;
    height: 50px;
    width: 100%;
    overflow-x: auto;
  }
`
