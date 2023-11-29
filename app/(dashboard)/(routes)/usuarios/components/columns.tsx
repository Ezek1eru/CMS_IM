'use client';
import { useEffect, useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { group } from 'console';
import { GrupoClient } from '../../grupos/components/client';

export type UsuarioColumn = {
  id: string;
  name: string;
  email: string;
  grupoId: string;
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
    accessorKey: 'grupoId',
    header: 'Grupo Misionero',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction usuario={row.original} />,
  },
];
