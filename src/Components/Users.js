import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

const API = "/mocks/Usersdata.json";

function Users() {
  const [contacts, setContacts] = useState([]);

  const [addFormData, setAddFormData] = useState({
    name: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get(API)
      .then((res) => setContacts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const [editFormData, setEditFormData] = useState({
    name: "",
    username: "",
    email: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      name: addFormData.name,
      username: addFormData.username,
      email: addFormData.email,
    };
    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      name: editFormData.name,
      username: editFormData.username,
      email: editFormData.email,
    };
    const newContacts = [...contacts];
    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      name: contact.name,
      username: contact.username,
      email: contact.email,
    };
    setEditFormData(formValues);
  };
  const handleCancelClick = () => {
    setEditContactId(null);
  };
  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];
    const index = contacts.findIndex((contact) => contact.id === contactId);
    newContacts.splice(index, 1);
    setContacts(newContacts);
  };
  return (
    <div>
      <div>
        <form onSubmit={handleAddFormSubmit}>
          <input
            className="input1"
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleAddFormChange}
          />
          <input
            className="input2"
            type="text"
            name="username"
            placeholder="Enter Username"
            onChange={handleAddFormChange}
          />
          <input
            className="input3"
            type="text"
            name="email"
            placeholder="Enter Email"
            onChange={handleAddFormChange}
          />
          <button className="btn btn-success my-3">Add New</button>
        </form>
      </div>
      <form onSubmit={handleEditFormSubmit}>
        <table className="table table-bordered" id="our-table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">UserName</th>
              <th scope="col">E-Mail</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {contacts.map((contact) => (
            <tbody className="table-group-divider">
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            </tbody>
          ))}
        </table>
      </form>
    </div>
  );
}

export default Users;
