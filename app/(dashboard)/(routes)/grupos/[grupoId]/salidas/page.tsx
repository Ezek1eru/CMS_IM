import { format } from 'date-fns';
import prismadb from '@/lib/prismadb';
import { UserClient } from './components/client';
import { SalidaColumn } from './components/columns';

const SalidasPage = async () => {
  const salidas = await prismadb.salida.findMany({
  });

  const formattedSalidas: SalidaColumn[] = salidas.map((item) => ({
    id: item.id,
    lugar: item.lugar,
    fecha: format(new Date(item.fecha), 'MMMM do, yyyy HH:mm'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-1 p-8 pt-6">
        <UserClient data={formattedSalidas} />
      </div>
    </div>
  );
};

export default SalidasPage;
