import { PaginationMeta } from "../types";

type PaginationProps = {
  currentPage: number;
  pagination: PaginationMeta;
  perPage: number;
  onPageChange: (page: number, perPage: number) => void;
};

const Pagination = ({
  pagination,
  perPage,
  onPageChange,
}: PaginationProps) => {
  const handlePageClick = (page: number) => {
    onPageChange(page, perPage);
  };

  return (
    <div className="d-flex justify-content-between mt-4">
      <nav aria-label="Page navigation">
        <ul className="pagination mb-0">
          <li className={`page-item ${!pagination.prevPage ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => pagination.prevPage && handlePageClick(pagination.prevPage)}
            >
              Previous
            </button>
          </li>

          {Array.from({ length: pagination.totalPage }, (_, i) => i + 1).map((page) => (
            <li
              key={page}
              className={"page-item"}
            >
              <button
                className="page-link"
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            </li>
          ))}

          <li className={`page-item ${!pagination.nextPage ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => pagination.nextPage && handlePageClick(pagination.nextPage)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
