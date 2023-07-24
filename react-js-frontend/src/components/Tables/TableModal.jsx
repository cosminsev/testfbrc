import styled from 'styled-components'
import { Modal } from 'react-bootstrap'
import { Button } from 'components'
import { ReactComponent as GlobeIcon } from 'assets/icons/organizations/GlobeIcon.svg'

export const TableModal = ({ selectedRow, columns, closeModal }) => {
 
  return (
    <Modal show={selectedRow != null} onHide={closeModal}>
      <StyledTableModal>
        <Modal.Header>
          <Modal.Title>
            <div className="title-container">
              <h3 className="title-header">Details for</h3> <GlobeIcon />
              <div className="network-text">{selectedRow?.network.props.text}</div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table-data">
            <tbody id={selectedRow?.id}>
              {columns?.map((column) => (
                <tr key={column?.name} className="table-row">
                  <th className="table-head">{column?.label || "Label"}</th>
                  <td className="table-cell">
                    {column.format ? column.format(selectedRow?.[column.name]) || '-' : selectedRow?.[column.name]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </StyledTableModal>
    </Modal>
  )
}

export const StyledTableModal = styled.div`
  .title-container {
    display: flex;
    align-items: center;

    .title-header {
      font-size: 1.25rem;
      margin-right: 12px;
    }
    .network-text {
      font-size: 1rem;
      font-weight: 600;
    }
  }

  .table-data {
    width: 100%;

    .table-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 48px;
      border-bottom: 1px solid #f0f1f3;

      .table-head {
        font-size: 1rem;
        font-weight: 600;
      }

      .table-cell {
        padding: 8px 16px;

        svg {
          cursor: pointer;

          :hover {
            path {
              stroke: #e60100;
              transition: 0.25s ease-in-out;
            }
          }
        }
      }
    }
  }

  button {
    padding: 0 0.5rem;
    font-size: 12px;
    font-weight: 400;
    line-height: 24px;
    background: #f0f1f3;
    color: #395264;
    box-shadow: 0 0.188rem 0.313rem 0.125rem rgba(0, 0, 0, 0.15);
    width: 100%;
    outline: 0;
    border: 0;
  }
`