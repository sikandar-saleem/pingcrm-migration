import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import Table from '../../components/Table';
import { useContact } from '../../hooks/useContact';
import { Contact, Column } from '../../types';
import ContactFormModal from '../../components/ContactFormModal';
import Alert from '../../components/Alert';
import SearchBar from '../../components/SearchBar';

const Contacts: React.FC = () => {
  const {
    contacts,
    loading,
    error,
    updateContact,
    deleteContact,
    createContact,
    fetchContacts,
  } = useContact();

  const [showModal, setShowModal] = useState(false);
  const [contactToEdit, setContactToEdit] = useState<Contact | null>(null);
  const [alert, setAlert] = useState<{ message: string; variant: string } | null>(null);
  const [_searchTerm, setSearchTerm] = useState<string>('');

  const handleCreateClick = () => {
    setContactToEdit(null);
    setShowModal(true);
  };

  const handleEdit = (contact: Contact) => {
    setContactToEdit(contact);
    setShowModal(true);
  };

  const handleDelete = async (contact: Contact) => {
    if (window.confirm(`Delete contact "${contact.name}"?`)) {
      try {
        if (contact.id !== undefined) {
          await deleteContact(contact.id);
          setAlert({ message: `Contact "${contact.name}" deleted successfully.`, variant: 'success' });
        }
      } catch (err) {
        setAlert({ message: 'Failed to delete contact.', variant: 'danger' });
      }
    }
  };

  const handleSubmit = async (contact: Contact) => {
    try {
      if (contact.id) {
        await updateContact(contact.id, contact);
        setAlert({ message: `Contact "${contact.name}" updated successfully.`, variant: 'success' });
      } else {
        await createContact(contact);
        setAlert({ message: `Contact "${contact.name}" created successfully.`, variant: 'success' });
      }
      setShowModal(false);
      await fetchContacts({});
    } catch (err) {
      setAlert({ message: 'Operation failed.', variant: 'danger' });
    }
  };

  const columns: Column[] = [
    { header: 'Name', accessor: 'name' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'City', accessor: 'city' }
  ];

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    fetchContacts({ search: newSearchTerm });
  };

  const debouncedSearch = useCallback(
    debounce(handleSearchChange, 800), 
    []
  );

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Contacts</h4>
        <button className="btn btn-primary" onClick={handleCreateClick}>
          Create Contact
        </button>
      </div>

      <SearchBar onSearchChange={debouncedSearch} />

      {alert && (
        <Alert
          variant={alert.variant as any}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && (
        <Table
          data={contacts}
          dataKey="contacts"
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPageChange={(params) => fetchContacts(params)}
        />
      )}

      <ContactFormModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        contactToEdit={contactToEdit}
      />
    </>
  );
};

export default Contacts;
