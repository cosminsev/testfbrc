import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchIcon from '../../assets/icons/search.svg'
import SearchEnterIcon from '../../assets/icons/Enter.svg'

export const SearchBox = ({ handleSearch, searchValue }) => {
  const [query, setQuery] = useState(searchValue || '')

  useEffect(() => {
    if (searchValue?.trim()?.length > 0) {
      handleSearch(searchValue)
    }
  }, [searchValue, handleSearch])

  const handleSubmit = (e) => {
    e.preventDefault()
    query?.trim()?.length > 0 && handleSearch(query)
  }
  const handleOnChangeInput = (value) => {
    setQuery(value.length < 60 ? value : query)
    // Call handleSearch by empty value to get all items by clicking on clear input button
    if (value === '') {
      handleSearch(value)
    }
  }

  return (
    <div className="wrapper-right-search">
      <StyledDiv>
        <form onSubmit={handleSubmit}>
          <img src={SearchIcon} alt="Search Icon" className="icon-search" />
          <img src={SearchEnterIcon} alt="Enter Search Icon" className="icon-enter-search" onClick={handleSubmit} />
          <input
            maxLength={60}
            type="search"
            placeholder="Text here"
            onChange={(event) => handleOnChangeInput(event.target.value)}
            value={query}
          />
        </form>
      </StyledDiv>
    </div>
  )
}

export const StyledDiv = styled.div`
  position: relative;
  min-width: min(21.85em, 32vw); // 350px
  width: 100%;

  @media only screen and (min-width: 768px) {
    max-width: 530px;
  }

  form {
    width: 100%;
  }

  .icon-search {
    position: absolute;
    left: 20px;
    top: 12px;
  }

  .icon-enter-search {
    right: 20px;
    position: absolute;
    top: 12px;
    cursor: pointer;
  }

  input[type='search'] {
    padding: 12px 48px;
    width: 100%;
    border-radius: 30px;
    border: 1.5px solid #d3d4d8;
    box-shadow: 0 0.188rem 0.313rem 0.125rem rgba(0, 0, 0, 0.1);
    transition: 0.3s ease;

    :hover {
      border: 1.5px solid #8ca6ba;
    }

    :focus-visible {
      outline-offset: 0;
      outline: 1px solid #8ca6ba;
    }
  }

  input[type='search']::placeholder {
    color: #d3d4d8;
    font-weight: normal;
    font: 14px;
    line-height: 24px;
  }
`
