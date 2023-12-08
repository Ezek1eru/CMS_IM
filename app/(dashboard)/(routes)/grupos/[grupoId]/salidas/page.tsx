import { format } from 'date-fns';
import prismadb from '@/lib/prismadb';
import { SalidaClient } from './components/client';
import { SalidaColumn } from './components/columns';

const SalidasPage = async ({
  params,
}: {
  params: {
    grupoId: string;
  };
}) => {
  const salidas = await prismadb.salida.findMany({
    where: {
      grupoId: params.grupoId,
  },
  include: {
    grupo: true,
  },
  orderBy: {
    createdAt: 'desc',
  },
});

  const formattedSalidas: SalidaColumn[] = salidas.map((item) => ({
    id: item.id,
    name: item.name,
    descripcion: item.descripcion,
    lugar: item.lugar,
    fecha: format(new Date(item.fecha), 'MMMM do, yyyy HH:mm'),
    grupoId: item?.grupoId,
    misioneroId: item?.misioneroId,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-1 p-8 pt-6">
        <SalidaClient data={formattedSalidas} />
      </div>
    </div>
  );
};

export default SalidasPage;
