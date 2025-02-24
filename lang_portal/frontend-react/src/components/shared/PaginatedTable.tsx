import { ReactNode } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';
import type { Pagination } from '../../types/api';

interface Column {
  id: string;
  label: string;
  render?: (value: any) => ReactNode;
}

interface PaginatedTableProps {
  columns: Column[];
  data: any[];
  pagination: Pagination;
  onPageChange: (page: number) => void;
}

export default function PaginatedTable({
  columns,
  data,
  pagination,
  onPageChange,
}: PaginatedTableProps) {
  const handleChangePage = (_: unknown, newPage: number) => {
    onPageChange(newPage + 1);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {column.render ? column.render(row[column.id]) : row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={pagination.total_items}
        page={pagination.current_page - 1}
        rowsPerPage={pagination.items_per_page}
        rowsPerPageOptions={[pagination.items_per_page]}
        onPageChange={handleChangePage}
      />
    </Paper>
  );
}
