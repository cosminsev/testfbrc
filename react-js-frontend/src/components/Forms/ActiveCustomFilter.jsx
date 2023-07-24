import { clone, cloneDeep } from 'lodash'
import { useState, useEffect, Fragment } from 'react'
import { ReactComponent as Remove } from 'assets/icons/Close.svg'
import { ReactComponent as ClearAll } from 'assets/icons/Trash.svg'

import styled from 'styled-components'
import { formatNumberWithCommas } from 'utils'

export const ActiveCustomFilter = ({
  appliedOptions,
  defaultFilters,
  setAppliedOptions,
  handleApplyFilter,
  setOptionsList,
}) => {
  //effect
  useEffect(() => {
    if (Object.keys(appliedOptions).length > 0) {
      handleApplyFilter(appliedOptions)
    }
  }, [appliedOptions, handleApplyFilter])

  const removeUnderline = (string) => {
    if (typeof string !== 'string') return
    return string.replaceAll('_', ' ')
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

  return (
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
            range: (
              <Fragment key={key}>
                {(defaultFilters[key].min !== appliedOptions[key][0] ||
                  defaultFilters[key].max !== appliedOptions[key][1]) && (
                  <div className="sf-filter-tag">
                    <p>
                      <span>
                        {`Price: ${defaultFilters[key].valuePrefix}${formatNumberWithCommas(
                          appliedOptions[key][0],
                        )} - ${defaultFilters[key].valuePrefix}${formatNumberWithCommas(appliedOptions[key][1])}`}
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
        <div className="sf-clear-icon">
          <ClearAll />
          <p>Clear</p>
        </div>
      </button>
    </div>
  )
}
