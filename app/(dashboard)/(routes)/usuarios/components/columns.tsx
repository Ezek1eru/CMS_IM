'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type UsuarioColumn = {
  id: string;
  name: string;
  email: string;
  // Agregar los demás campos de acuerdo al esquema de Prisma User
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
  // Agregar el resto de columnas según el modelo de Prisma User
  // Ejemplo:
  // {
  //   accessorKey: 'apellido',
  //   header: 'Apellido',
  // },
  // {
  //   accessorKey: 'numeroDocumento',
  //   header: 'Número de Documento',
  // },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
