import { useState, useEffect } from 'react';
import * as api from '../api/contact';
import { Contact } from '../types';

export const useContact = (id?: number) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getContacts(params);
      setContacts(data);
    } catch (err: any) {
      setError(`Failed to fetch contacts: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchContact = async (contactId: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getContact(contactId);
      setContact(data);
    } catch (err: any) {
      setError(`Failed to fetch contact: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateContact = async (contactId: number, data: Partial<Contact>) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await api.updateContact(contactId, data);
      setContact(updated);
      fetchContacts();
    } catch (err: any) {
      setError(`Failed to update contact: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (contactId: number) => {
    try {
      setLoading(true);
      setError(null);
      await api.deleteContact(contactId);
      fetchContacts();
    } catch (err: any) {
      setError(`Failed to delete contact: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const createContact = async (data: Omit<Contact, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const newContact = await api.createContact(data);
      setContacts([...contacts, newContact]);
    } catch (err: any) {
      setError(`Failed to create contact: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchContact(id);
    } else {
      fetchContacts();
    }
  }, [id]);

  return {
    contacts,
    contact,
    loading,
    error,
    fetchContacts,
    fetchContact,
    updateContact,
    deleteContact,
    createContact,
  };
};
