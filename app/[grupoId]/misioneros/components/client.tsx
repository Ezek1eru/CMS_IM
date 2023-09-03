'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { MisioneroColumn, columns } from './columns';

interface MisioneroClientProps {
  data: MisioneroColumn[];
}

export const MisioneroClient: React.FC<MisioneroClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Misioneros (${data.length})`}
          description="Administra los misioneros"
        />
        <div className="space-x-2">
          <Button onClick={() => router.push(`/grupos/${params.grupoId}`)}>
            <Plus className="mr-2 h-4 w-4" />
            Añadir
          </Button>
          <Button onClick={() => router.push(`/misioneros/new`)}>
            <Plus className="mr-2 h-4 w-4" />
            Add new
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
