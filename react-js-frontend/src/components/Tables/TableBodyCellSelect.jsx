import styled from 'styled-components'
import Form from 'react-bootstrap/Form'

export const TableBodyCellSelect = ({ columns, columnName, options, value, onChange }) => {
  const column = columns?.find((col) => col.name === columnName) || {}

  return (
    <StyledCellSelect data-th={column?.label || 'Movies'}>
      <Form.Select value={value} onChange={onChange}>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option || ''}
          </option>
        ))}
      </Form.Select>
    </StyledCellSelect>
  )
}

export const StyledCellSelect = styled.td`
  width: 200px;

  .form-select {
    color: #888;
    width: fit-content;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='gray' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");

    :focus {
      border-color: rgba(136, 136, 136, 0.25);
      outline: 0;
      box-shadow: 0 0 0 0.25rem rgba(136, 136, 136, 0.25);
    }
  }
`
