import styled from 'styled-components'

export const TableRows = ({ rows, columns, className, maxWidth='750px' }) => {
  return (
    <TableInfo className={className} maxWidth={maxWidth}>
      <table>
        {columns && (
          <thead>
            <tr>
              {columns.map((item, index) => {
                return <th key={index}>{item}</th>
              })}
            </tr>
          </thead>
        )}

        <tbody>
          {rows.map((item, index) => {
            return (
              <tr key={index}>
                {
                  {
                    h4: (
                      <th>
                        <div className="table-row">
                          <h4>{item.rowTitle}</h4>
                        </div>
                      </th>
                    ),
                    p: (
                      <>
                        <th>
                          <p className="text-body-2">{item.rowTitle}</p>
                        </th>
                        {item?.data?.map((elem, ind) => {
                          return (
                            <td key={ind}>
                              <p className="text-body-2 c-info">{elem}</p>
                            </td>
                          )
                        })}
                      </>
                    ),
                  }[item.tagType]
                }
              </tr>
            )
          })}
        </tbody>
      </table>
    </TableInfo>
  )
}

export const TableInfo = styled.div`
  background-color: ${({ theme }) => theme.colors.neutralLightGrey};
  border-radius: 8px;
  padding: 0 20px;
  max-width: ${({maxWidth})=> maxWidth};
  margin: 2% 0;

  &.rented-ips {
    .c-info {
      font-weight: 600;
    }
  }

  .table-row {
    padding: 15.8px 0;

    &:last-of-type {
      border: none;
    }
  }

  table {
    width: 100%;
    thead {
      tr {
        th {
          text-align: center;
          color: ${({ theme }) => theme.colors.secondaryBlueMedium};
          font-weight: 600;

          &:first-of-type {
            text-align: start;

            /* padding-left: 20px !important; */
          }

          &:last-of-type {
            text-align: end;

            /* padding-right: 20px !important; */
          }
        }
      }
    }

    tr {
      background-color: inherit;
      border-bottom: 1px solid ${({ theme }) => theme.colors.neutralRegularGrey};

      th {
        padding: 0 !important;
      }

      td {
        text-align: center;

        &:first-of-type {
          text-align: center;
        }

        &:last-of-type {
          text-align: end;
        }
      }
    }

    /* tbody {
      background-color: red;
      tr {
        th, td:last-of-type{
            border-radius: 0;
          }

          th {
            padding-left: 20px !important;
          }

          td:last-of-type{
            padding-right: 20px !important;
          }

          
        &:first-of-type {
          th {
            border-radius: 8px 0 0 0;
          }

          td:last-of-type {
            border-radius: 0 8px 0 0;
          }
        }

        &:last-of-type {
          th {
            border-radius: 0 0 0 8px;
          }

          td:last-of-type {
            border-radius: 0 0 8px 0;
          }
        }
      }
    } */
  }
`
