export type Column = {
  header: string;
  accessor: any;
};

export interface Contact {
  id?: number;
  name: string;
  phone: string;
  city: string;
  company_id: number;
}

export interface Company {
  id?: number;
  name: string;
  status: string;
  description?: string;
}

export interface CompanyOptions {
  id: number;
  name: string;
}

export interface QueryParamsType {
  perPage?: number;
  page?: number;
  [key: string]: any;
}

export type PaginationMeta = {
  totalRecords: number;
  nextPage: number | null;
  prevPage: number | null;
  totalPage: number;
};
