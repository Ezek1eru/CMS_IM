import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';

import { GrupoClient } from './components/client';
import { GrupoColumn } from './components/columns';

const GruposPage = async () => {
  const grupo = await prismadb.grupo.findMany();

  const formattedGrupos: GrupoColumn[] = grupo.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-1 p-8 pt-6">
        <GrupoClient data={formattedGrupos} />
      </div>
    </div>
  );
};

export default GruposPage;
