import { useState } from "react";

// External components
import { TablePagination } from "../consts";

function TablePaginationComponent({ children }) {
  //Paginas
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 100]}
      component="div"
      count={children.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}

export default TablePaginationComponent;
