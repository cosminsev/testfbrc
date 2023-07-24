import styled from 'styled-components'
import Upload from 'assets/icons/UploadIcon.svg'

export const UploadDocuments = ({ onChange, name, value, extraText }) => {
  return (
    <StyledUploadComponents>
      <div className="m-3">
        {extraText && <p className="text-bold mb-1">{extraText}</p>}
        <input
          onChange={onChange}
          type="file"
          className="d-none"
          name={name || 'file'}
          filename={value?.name}
          id={name || 'file'}
          accept="application/msword, application/pdf"
        />
        <label htmlFor={name || 'file'} className="sf-upload-button">
          <img src={Upload} alt="Browse to upload" />
          Browse to upload
        </label>
        <p className="sf-upload-note">Supported formats: PDF or DOC. with a max. size: 5MB.</p>
      </div>
    </StyledUploadComponents>
  )
}

export const StyledUploadComponents = styled.div`
  .sf-upload-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
    border: 1px dashed #8ca6ba;
    border-radius: 5px;
    max-width: 645px;
    width: 100%;
    color: #395264;
    font-weight: 400;
    padding: 14px 5px;
    cursor: pointer;
  }

  .sf-upload-note {
    font-weight: normal;
    font-size: 12px;
    color: #395264;
  }
`
