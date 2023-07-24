import styled from 'styled-components'

export const TableBodyNoData = ({
  icon,
  text,
  subText,
  columnsCount,
  noDataRows,
}) => {
  return (
    <>
      {[...Array(noDataRows || 10)].map((item, index) => (
        <tr key={index} className='sf-no-hover-effect'>
          {[...Array(columnsCount)].map((cell, ind) => (
            <td key={ind}></td>
          ))}
        </tr>
      ))}
      <tr className='sf-loading-tr'>
        <td className='loading'>
          <img src={icon} alt='Loading Icon' />
          <h3 className='h3-text'>{text}</h3>
          {subText && (
            <StyledSubtext className='text-body-2'>{subText}</StyledSubtext>
          )}
        </td>
      </tr>
    </>
  )
}

const StyledSubtext = styled.p`
  white-space: normal;
  text-align: center;
`
