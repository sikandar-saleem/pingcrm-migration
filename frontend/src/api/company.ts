import axiosInstance from './client';
import { Company } from "../types";
import { QueryParamsType } from '../types';

export const getCompanies = async (params: QueryParamsType = {}): Promise<Company[]> => {
  try {
    const response = await axiosInstance.get<{ data: Company[] }>("/companies", {
      params,
    });

    return response.data.data;
  } catch (err: any) {
    throw new Error(err?.response?.data || "An error occurred while fetching companies.");
  }
};

export const getCompaniesOptions = async (): Promise<Company[]> => {
  try {
    const response = await axiosInstance.get<{ data: Company[] }>("/companies/options");

    return response.data.data;
  } catch (err: any) {
    throw new Error(err?.response?.data || "An error occurred while fetching companies.");
  }
};

export const getCompany = async (id: number): Promise<Company> => {
  try {
    const response = await axiosInstance.get<Company>(`/companies/${id}`);
    return response.data;
  } catch (err: any) {
    throw new Error(err?.response?.data || `An error occurred while fetching company with ID ${id}.`);
  }
};

export const createCompany = async (data: Partial<Company>): Promise<Company> => {
  try {
    const response = await axiosInstance.post<Company>("/companies", data);
    return response.data;
  } catch (err: any) {
    throw new Error(err?.response?.data || "An error occurred while creating a company.");
  }
};

export const updateCompany = async (id: number, data: Partial<Company>): Promise<Company> => {
  try {
    const response = await axiosInstance.put<Company>(`/companies/${id}`, data);
    return response.data;
  } catch (err: any) {
    throw new Error(err?.response?.data || `An error occurred while updating company with ID ${id}.`);
  }
};

export const deleteCompany = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/companies/${id}`);
  } catch (err: any) {
    throw new Error(err?.response?.data || `An error occurred while deleting company with ID ${id}.`);
  }
};
