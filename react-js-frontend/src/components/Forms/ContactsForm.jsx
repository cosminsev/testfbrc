import { ContactForm } from 'components'
import styled from 'styled-components'

export const ContactsForm = ({ fields, contacts, updateHandler, deleteHandler, addResourceComponent, isError }) => {
  return (
    <StyledDiv>
      <div open className="contacts">
        {contacts?.map((contact, i) => (
          <ContactForm
            key={i}
            contact={contact}
            index={i}
            itemsNumber={contacts.length}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            fields={fields}
            isError={isError && isError[i]}
            hideDelete={contacts.length <= 1}
          />
        ))}
      </div>
      <div className="tab-actions">{addResourceComponent}</div>
    </StyledDiv>
  )
}

export const StyledDiv = styled.div`
  padding-block: 1em;
  display: flex;
  flex-direction: column;
  overflow: scroll;

  .contacts {
    margin-bottom: 8px;
    display: flex;
    flex-direction: column-reverse;
    overflow-y: auto;
  }

  .tab-actions {
    display: flex;
    justify-content: flex-end;
  }
`
