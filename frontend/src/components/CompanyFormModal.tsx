import React, { useEffect } from 'react';
import { Company } from '../types';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

type CompanyFormModalProps = {
  show: boolean;
  onClose: () => void;
  onSubmit: (company: Company) => void;
  companyToEdit?: Company | null;
};

const CompanyFormModal: React.FC<CompanyFormModalProps> = ({
  show,
  onClose,
  onSubmit,
  companyToEdit,
}) => {
  const validationSchema = Yup.object({
    name: Yup.string()
    .required('Name is required')
    .matches(/^[A-Za-z\s]+$/, 'Name must contain only alphabets and spaces'),
    status: Yup.string().required('Status is required')
  });

  return (
    <div
      className={`modal fade ${show ? 'show' : ''}`}
      style={{ display: show ? 'block' : 'none' }}
      aria-labelledby="companyModalLabel"
      aria-hidden={!show}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="companyModalLabel">
              {companyToEdit ? 'Edit Company' : 'Create Company'}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => onClose()}
              aria-label="Close"
            ></button>
          </div>

          <Formik
            initialValues={{
              name: companyToEdit?.name || '',
              status: companyToEdit?.status || '',
              description: companyToEdit?.description || '',
            }}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
              const company = companyToEdit
                ? { ...companyToEdit, ...values }
                : { ...values };
              onSubmit(company);
              resetForm();
              onClose();
            }}
          >
            {({ errors, touched, resetForm }) => {
              useEffect(() => {
                if (!show) resetForm();
              }, [show, resetForm]);

              return (
                <Form>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Company Name</label>
                      <Field
                        name="name"
                        className={`form-control ${
                          errors.name && touched.name ? 'is-invalid' : ''
                        }`}
                      />
                      {errors.name && touched.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <Field
                        as="select"
                        name="status"
                        className={`form-select ${
                          errors.status && touched.status ? 'is-invalid' : ''
                        }`}
                      >
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </Field>
                      {errors.status && touched.status && (
                        <div className="invalid-feedback">{errors.status}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <Field
                        as="textarea"
                        name="description"
                        className={`form-control ${
                          errors.description && touched.description
                            ? 'is-invalid'
                            : ''
                        }`}
                      />
                      {errors.description && touched.description && (
                        <div className="invalid-feedback">
                          {errors.description}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        resetForm();
                        onClose();
                      }}
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {companyToEdit ? 'Update' : 'Create'}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CompanyFormModal;
