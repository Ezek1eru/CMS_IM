import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action'; 

export type SalidaColumn = {
  id: number;
  lugar: string;
  fecha: string;
};

export const columns: ColumnDef<SalidaColumn>[] = [
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
    cell: ({ row }) => <CellAction salida={row.original} />, 
  },
];
