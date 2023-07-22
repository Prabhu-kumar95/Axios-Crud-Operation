import { React } from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.name}</td>
      <td>{contact.username}</td>
      <td>{contact.email}</td>
      <td>
        <button
          type="button"
          class="btn btn-dark"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Update
        </button>

        <button
          type="button"
          class="btn btn-danger"
          onClick={() => handleDeleteClick(contact.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
export default ReadOnlyRow;
