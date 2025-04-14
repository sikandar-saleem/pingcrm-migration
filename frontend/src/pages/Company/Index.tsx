import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import Table from '../../components/Table';
import { useCompany } from '../../hooks/useCompany';
import { Company, Column } from '../../types';
import CompanyFormModal from '../../components/CompanyFormModal';
import Alert from '../../components/Alert';
import SearchBar from '../../components/SearchBar';

const Companies: React.FC = () => {
  const {
    companies,
    loading,
    error,
    updateCompany,
    deleteCompany,
    createCompany,
    fetchCompanies,
  } = useCompany();

  const [showModal, setShowModal] = useState(false);
  const [companyToEdit, setCompanyToEdit] = useState<Company | null>(null);
  const [alert, setAlert] = useState<{ message: string; variant: string } | null>(null);
  const [_searchTerm, setSearchTerm] = useState<string>('');

  const handleCreateClick = () => {
    setCompanyToEdit(null);
    setShowModal(true);
  };

  const handleEdit = (company: Company) => {
    setCompanyToEdit(company);
    setShowModal(true);
  };

  const handleDelete = async (company: Company) => {
    if (window.confirm(`Are you sure to delete company "${company.name}" with all their associated contacts?`)) {
      try {
        if(company.id !== undefined) {
          await deleteCompany(company.id);
          setAlert({ message: `Company "${company.name}" deleted successfully.`, variant: 'success' });
        }
      } catch (err) {
        setAlert({ message: 'Failed to delete company.', variant: 'danger' });
      }
    }
  };

  const handleSubmit = async (company: Company) => {
    try {
      if (company.id) {
        await updateCompany(company.id, company);
        setAlert({ message: `Company "${company.name}" updated successfully.`, variant: 'success' });
      } else {
        await createCompany(company);
        setAlert({ message: `Company "${company.name}" created successfully.`, variant: 'success' });
      }
      setShowModal(false);

      await fetchCompanies({});
      
    } catch (err) {
      setAlert({ message: 'Operation failed.', variant: 'danger' });
    }
  };

  const columns: Column[] = [
    { header: 'Name', accessor: 'name' },
    { header: 'Status', accessor: 'status' },
    { header: 'Description', accessor: 'description' },
  ];

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    fetchCompanies({ search: newSearchTerm });
  };

  const debouncedSearch = useCallback(
    debounce(handleSearchChange, 500),
    []
  );

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Companies</h4>
        <button className="btn btn-primary" onClick={handleCreateClick}>
          Create Company
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
          data={companies}
          dataKey="companies"
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPageChange={(params) => fetchCompanies(params)}
        />
      )}

      <CompanyFormModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        companyToEdit={companyToEdit}
      />
    </>
  );
};

export default Companies;
