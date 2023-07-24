import { TableHeadCell } from './TableHeadCell'
import { isEmpty } from 'lodash'

export const TableHead = ({
  sortingBy,
  columns,
  rows,
  hiddenColumns,
  selectableRows,
  selectedRows,
  toggleSelectAllRowsHandler,
  ordering,
}) => {
  return (
    <thead>
      <tr>
        {selectableRows && !!rows?.length && (
          <th>
            <label className="sf-thin-text sf-checkboxes-input d-block m-0">
              <input
                name="toggle-select-all"
                type="checkbox"
                checked={!isEmpty(selectedRows) && Object.keys(selectedRows).every((rowId) => selectedRows[rowId])}
                onChange={toggleSelectAllRowsHandler}
              />
              <div className="sf-custom-checkbox-input mx-auto"></div>
            </label>
          </th>
        )}
        {columns?.map(
          (column) =>
            !hiddenColumns?.includes(column.name) && (
              <TableHeadCell key={column.name} column={column} sortingBy={sortingBy} ordering={ordering} />
            ),
        )}
      </tr>
    </thead>
  )
}
