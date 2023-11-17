'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type UsuarioColumn = {
  id: string;
  name: string;
  email: string;
  // apellido: string;
  // numeroAlumno: string;
  // edad: string;
  // tipoDocumento: string;
  // numeroDocumento: string;
  // carrera: string;
  // numeroTelefono: string;
  createdAt: string;
};

export const columns: ColumnDef<UsuarioColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
