'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/router';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { useModal } from '@/hooks/use-modal-store';
import { SalidaColumn, columns } from './columns';

interface SalidaProps {
  data: SalidaColumn[];
}

export const UserClient: React.FC<SalidaProps> = ({ data }) => {
  const { onOpen } = useModal();


  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Salida (${data.length})`}
          description="Administra las salidas"
        />
        <Button onClick={() => onOpen('crearSalida')}>
          <Plus className="mr-2 h-4 w-4" />
          Añadir
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};