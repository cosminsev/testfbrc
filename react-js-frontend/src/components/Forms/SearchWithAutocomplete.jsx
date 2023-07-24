import sanitizeHtml from 'sanitize-html'
import { useState, useEffect } from 'react'
import styled, { useTheme } from 'styled-components'
import { ListGroup } from 'react-bootstrap'
// styles and assets
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg'
// components
import { LoadingAnimation } from 'components'

export const SearchWithAutocomplete = ({
  input: {
    name,
    label,
    resultDisplayLeftProp,
    resultDisplayRightProp,
    resultDisplayRightPrefix,
    requestBodyProp,
    placeholder,
    searchHandler,
  },
  currentValue,
  onSelectResult,
}) => {
  // local state
  const [value, setValue] = useState('')
  const [selected, setSelected] = useState(false)
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // utils
  const theme = useTheme()

  // effects
  useEffect(() => {
    if (!currentValue && value) setValue('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue])

  // handlers
  const handleChange = async (e) => {
    let promise = null
    setSelected(false)
    setValue(e.target.value.length < 60 ? e.target.value : value)
    if (currentValue) onSelectResult({ prop: name, value: null })
    promise?.abort()

    if (e.target.value?.trim().length > 0) {
      if (error) setError(null)
      setIsLoading(true)
      promise = searchHandler(e.target.value)

      promise.then((res) => {
        setIsLoading(false)
        if (res.error) {
          setError(res.error?.message || 'Something went wrong when searching for results...')
        } else {
          setResults(res.payload?.results || null)
        }
      })
    } else {
      if (results) setResults([])
    }
  }

  const handleSelectResult = (id, value) => {
    onSelectResult({ prop: name, value: id })
    setValue(value)
    setSelected(true)
    setResults([])
  }

  const SanitizeHTML = ({ html }) => <span dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }} />

  return (
    <StyledDiv className="sf-input-container">
      <label className="sf-form-label">
        {label} {error && <span className="error">{error}</span>}
      </label>

      <div className="input-group">
        <input
          maxLength={60}
          type="search"
          name={name}
          autoComplete="off"
          placeholder={placeholder || 'Type here'}
          value={value}
          onChange={handleChange}
        />
        {isLoading ? <LoadingAnimation color={theme.colors.stateError} /> : <SearchIcon />}
      </div>

      {value?.length > 0 && !selected && !isLoading && (
        <ListGroup as="ul" className="search-results">
          {results?.length > 0 ? (
            results.map((result) => {
              return (
                <ListGroup.Item
                  key={result[requestBodyProp]}
                  as="li"
                  className="d-flex align-items-center justify-content-between"
                  onClick={() => handleSelectResult(result[requestBodyProp], result[resultDisplayLeftProp])}
                >
                  <SanitizeHTML html={result[resultDisplayLeftProp].replace(value, `<b>${value}</b>`)} />
                  <span>
                    {result[resultDisplayRightProp] && (
                      <>
                        {resultDisplayRightPrefix} {result[resultDisplayRightProp]}
                      </>
                    )}
                  </span>{' '}
                </ListGroup.Item>
              )
            })
          ) : (
            <ListGroup.Item key={'no-results-info'} as="li" className="py-3">
              No results found for{' '}
              <b>
                {' '}
                <i>{value}</i>
              </b>
            </ListGroup.Item>
          )}
        </ListGroup>
      )}
    </StyledDiv>
  )
}

export const StyledDiv = styled.div`
  position: relative;

  label span {
    font-weight: 400;
  }

  .error {
    color: ${({ theme }) => theme.colors.stateError};
    font-size: ${({ theme }) => theme.typography.p};
  }

  .input-group {
    display: flex;
    align-items: center;

    input {
      width: 100%;
      padding-right: 2.6em;
      border-radius: 4px !important;
    }

    svg {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0.6em;
      display: flex;
      height: 100%;
      justify-content: center;
    }
  }

  .search-results {
    position: absolute;
    inset-inline: 0;
    width: 100%;
    max-height: 20em;
    overflow-y: scroll;
    top: 4.6em;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    z-index: 4;

    li {
      cursor: pointer;
    }
  }
`
