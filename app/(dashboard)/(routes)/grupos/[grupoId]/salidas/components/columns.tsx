'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action'; 

export type SalidaColumn = {
  id: string;
  name: string;
  lugar: string;
  fecha: string;
};

export const columns: ColumnDef<SalidaColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'lugar',
    header: 'Lugar',
  },
  {
    accessorKey: 'fecha',
    header: 'Fecha',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />, 
  },
];
