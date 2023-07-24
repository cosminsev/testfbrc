import { ReactComponent as RemoveIcon } from 'assets/icons/Remove.svg'
import cx from 'classnames'
import { ipsApi } from 'features/ips'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { downloadPdfFileFromBase64 } from 'utils'
import { UploadDocuments } from '.'

export const CheckboxUpload = ({ info, changeCheckbox, handleFileChange, extraText }) => {
  const [check, setCheck] = useState(info?.checked || false)
  const handleCheckBox = (e) => {
    changeCheckbox(e)
    setCheck(!check)
  }
  const { ipId } = useParams()

  const handleDownloadPoaFile = async () => {
    const { document: base64String } = await ipsApi.getPoaDocument(ipId, { doc_id: info?.poaDocDetails?.id })
    downloadPdfFileFromBase64(base64String, info?.poaDocDetails?.name?.replace('.pdf', '') || 'POA profile')
  }

  // variables
  const hasPoaFile = !!info?.poaDocDetails?.id
  const poaFileComponent = hasPoaFile && (
    <span className="link" onClick={handleDownloadPoaFile} role="button">
      <b>Current file :</b> {info?.poaDocDetails?.name}
    </span>
  )

  return (
    <StyledTab>
      <div className="header">
        <h6>{info.title}</h6>
      </div>
      <div>
        <label
          className={cx('sf-thin-text sf-checkboxes-input', {
            disabled: info?.disabled,
          })}
        >
          <input
            type="checkbox"
            name={info.checkboxName}
            defaultChecked={info?.checked}
            onChange={(e) => handleCheckBox(e)}
            disabled={info?.disabled}
          />
          <div className="sf-custom-checkbox-input"></div>
          {info.label}
        </label>

        {check === false && (
          <>
            {!info?.file && poaFileComponent}
            {info?.file ? (
              <div className="d-flex align-items-center gap-2">
                <span>{info?.file?.name}</span>
                <RemoveIcon
                  className="cursor-pointer"
                  role="button"
                  onClick={() => {
                    info?.onDelete
                      ? info.onDelete()
                      : handleFileChange({
                          target: { name: info?.fileInputName, files: [''] },
                        })
                  }}
                />
              </div>
            ) : (
              <UploadDocuments
                name={info?.fileInputName}
                onChange={handleFileChange}
                value={info?.file}
                extraText={info?.extraText}
              />
            )}
          </>
        )}
      </div>
    </StyledTab>
  )
}
export const StyledTab = styled.div`

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutralMediumGrey};
    padding: 10px 0;
  }

  label {
    cursor: pointer;
  }
`
