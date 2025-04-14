import axiosInstance from './client';
import { Contact } from "../types";
import { QueryParamsType } from '../types';

export const getContacts = async (params: QueryParamsType = {}): Promise<Contact[]> => {
  try {
    const response = await axiosInstance.get<{ data: Contact[] }>("/contacts", {
      params,
    });
    return response.data.data;
  } catch (err: any) {
    throw new Error(err?.response?.data || "An error occurred while fetching contacts.");
  }
};

export const getContact = async (id: number): Promise<Contact> => {
  try {
    const response = await axiosInstance.get<Contact>(`/contacts/${id}`);
    return response.data;
  } catch (err: any) {
    throw new Error(err?.response?.data || `An error occurred while fetching contact with ID ${id}.`);
  }
};

export const createContact = async (data: Partial<Contact>): Promise<Contact> => {
  try {
    const response = await axiosInstance.post<Contact>("/contacts", data);
    return response.data;
  } catch (err: any) {
    throw new Error(err?.response?.data || "An error occurred while creating a contact.");
  }
};

export const updateContact = async (id: number, data: Partial<Contact>): Promise<Contact> => {
  try {
    const response = await axiosInstance.put<Contact>(`/contacts/${id}`, data);
    return response.data;
  } catch (err: any) {
    throw new Error(err?.response?.data || `An error occurred while updating contact with ID ${id}.`);
  }
};

export const deleteContact = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/contacts/${id}`);
  } catch (err: any) {
    throw new Error(err?.response?.data || `An error occurred while deleting contact with ID ${id}.`);
  }
};
