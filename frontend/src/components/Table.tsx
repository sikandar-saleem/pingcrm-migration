import { useEffect, useState } from "react";
import { Column } from "../types";
import Pagination from "./Pagination";
import { Pencil, Trash } from "lucide-react";
import { PaginationMeta } from "../types";

type TableProps = {
  data: Record<string, any>;
  dataKey: string;
  columns: Column[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onPageChange?: ({ page, perPage }: { page: number; perPage: number }) => void;
};

const Table = <T extends { id: number }>({
  data,
  dataKey,
  columns,
  onEdit,
  onDelete,
  onPageChange,
}: TableProps) => {
  const rows: T[] = data?.[dataKey] || [];
  const pagination: PaginationMeta | undefined = data?.pagination;

  const [perPage, _setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(data?.currentPage || 1);

  useEffect(() => {
    if (data?.currentPage && data.currentPage !== currentPage) {
      setCurrentPage(data.currentPage);
    }
  }, [data?.currentPage]);

  const handlePageChange = (page: number, perPageVal: number) => {
    setCurrentPage(page);
    if (onPageChange) onPageChange({ page, perPage: perPageVal });
  };

  const renderCell = (row: T, accessor: keyof T) => {
    if (accessor === "status") {
      const status = String(row[accessor]).toUpperCase();
      const badgeClass =
        status === "ACTIVE"
          ? "badge bg-success p-1 fs-8"
          : "badge bg-danger p-1 fs-8";
      return <span className={badgeClass}>{status}</span>;
    }

    const value = String(row[accessor]);
    const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
    return capitalized;
  };

  return (
    <div className="card shadow-sm">
      <div className="table-responsive">
        <table className="table table-hover mb-0 align-middle">
          <thead className="table-light">
            <tr>
              {columns.map((col) => (
                <th key={col.accessor.toString()} className="fw-bold text-uppercase small py-3">
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="fw-bold text-uppercase small text-end py-3">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <tr key={row.id}>
                  {columns.map((col) => (
                    <td key={col.accessor.toString()} className="py-3">
                      {renderCell(row, col.accessor.toString() as keyof T)}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="text-end py-3 pe-4">
                      {onEdit && (
                        <button
                          className="btn btn-sm btn-light me-2"
                          onClick={() => onEdit(row)}
                          title="Edit"
                        >
                          <Pencil size={18} className="text-primary" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          className="btn btn-sm btn-light"
                          onClick={() => onDelete(row)}
                          title="Delete"
                        >
                          <Trash size={18} className="text-danger" />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="text-center py-4 text-muted">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalPage > 1 && (
        <Pagination
          currentPage={currentPage}
          pagination={pagination}
          perPage={perPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Table;
