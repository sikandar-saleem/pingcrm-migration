import React, { useEffect, useState } from 'react';
import { CompanyOptions, Contact} from '../types';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useCompany } from '../hooks/useCompany';

type ContactFormModalProps = {
  show: boolean;
  onClose: () => void;
  onSubmit: (contact: Contact) => void;
  contactToEdit?: Contact | null;
};

const ContactFormModal: React.FC<ContactFormModalProps> = ({
  show,
  onClose,
  onSubmit,
  contactToEdit,
}) => {

  const { fetchCompaniesOptions } = useCompany();
  const[companyOptions, setCompanyOptions] =  useState<CompanyOptions[]>([])

  useEffect(() => {
    fetchCompaniesOptions()
      .then((res) => {
        // @ts-ignore: Suppress possible undefined warning for this line
        setCompanyOptions(res.result);
      })
      .catch((err) => {
        console.error('Failed to fetch company options:', err);
      });
  }, []);
  

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .matches(/^[A-Za-z\s]+$/, 'Name must contain only alphabets and spaces'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^\+?[0-9]{10,15}$/, 'Phone number must be between 10 and 15 digits, with an optional "+" at the beginning'),
    city: Yup.string()
      .required('City is required')
      .matches(/^[A-Za-z\s]+$/, 'City must contain only alphabets and spaces'),
    company_id: Yup.string().required('Company is required'),
  });

  return (
    <div
      className={`modal fade ${show ? 'show' : ''}`}
      style={{ display: show ? 'block' : 'none' }}
      aria-labelledby="contactModalLabel"
      aria-hidden={!show}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="contactModalLabel">
              {contactToEdit ? 'Edit Contact' : 'Create Contact'}
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
              name: contactToEdit?.name || '',
              phone: contactToEdit?.phone || '',
              city: contactToEdit?.city || '',
              company_id: contactToEdit?.company_id?.toString() || '',
            }}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values, { resetForm }) => {
              const contact = contactToEdit
                ? { ...contactToEdit, ...values, company_id: Number(values.company_id) }
                : { ...values, company_id: Number(values.company_id) };
              onSubmit(contact);
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
                      <label className="form-label">Name</label>
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
                      <label className="form-label">Phone</label>
                      <Field
                        name="phone"
                        className={`form-control ${
                          errors.phone && touched.phone ? 'is-invalid' : ''
                        }`}
                      />
                      {errors.phone && touched.phone && (
                        <div className="invalid-feedback">{errors.phone}</div>
                      )}
                    </div>


                    <div className="mb-3">
                      <label className="form-label">City</label>
                      <Field
                        name="city"
                        className={`form-control ${
                          errors.city && touched.city ? 'is-invalid' : ''
                        }`}
                      />
                      {errors.city && touched.city && (
                        <div className="invalid-feedback">{errors.city}</div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Company</label>
                      <Field
                        as="select"
                        name="company_id"
                        className={`form-select ${
                          errors.company_id && touched.company_id ? 'is-invalid' : ''
                        }`}
                      >
                        <option value="">Select a Company</option>
                        {companyOptions.map((company) => (
                          <option key={company.id} value={company.id}>
                            {company.name}
                          </option>
                        ))}
                      </Field>
                      {errors.company_id && touched.company_id && (
                        <div className="invalid-feedback">{errors.company_id}</div>
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
                      {contactToEdit ? 'Update' : 'Create'}
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

export default ContactFormModal;
