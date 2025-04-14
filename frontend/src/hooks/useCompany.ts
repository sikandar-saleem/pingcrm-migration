import { useState, useEffect } from 'react';
import * as api from '../api/company';
import { Company } from '../types';

export const useCompany = (id?: number) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanies = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getCompanies(params);
      setCompanies(data);
    } catch (err: any) {
      setError(`Failed to fetch companies: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompaniesOptions = async () => {
    try {
      setLoading(true);
      setError(null);
      return await api.getCompaniesOptions(); // no wrapping
    } catch (err: any) {
      setError(`Failed to fetch companies: ${err.message}`);
      return { result: [] };
    } finally {
      setLoading(false);
    }
  };

  const fetchCompany = async (companyId: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getCompany(companyId);
      setCompany(data);
      return data;
    } catch (err: any) {
      setError(`Failed to fetch company: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateCompany = async (companyId: number, data: Partial<Company>) => {
    try {
      setLoading(true);
      setError(null); 
      const updatedCompany = await api.updateCompany(companyId, data);
      setCompany(updatedCompany);
      fetchCompanies();
    } catch (err: any) {
      setError(`Failed to update company: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteCompany = async (companyId: number) => {
    try {
      setLoading(true);
      setError(null);
      await api.deleteCompany(companyId);
      fetchCompanies();
    } catch (err: any) {
      setError(`Failed to delete company: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const createCompany = async (data: Omit<Company, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const newCompany = await api.createCompany(data);
      setCompanies([...companies, newCompany]);
      console.log('newCompany', newCompany);
      return newCompany;
    } catch (err: any) {
      setError(`Failed to create company: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCompany(id);
    } else {
      fetchCompanies();
    }
  }, [id]); 

  return {
    companies,
    company,
    loading,
    error,
    fetchCompanies,
    fetchCompaniesOptions,
    fetchCompany,
    updateCompany,
    deleteCompany,
    createCompany,
  };
};
