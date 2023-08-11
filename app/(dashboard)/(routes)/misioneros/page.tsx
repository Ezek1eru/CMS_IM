import { format } from 'date-fns';

import prismadb from '@/lib/prismdb';

import { MisioneroClient } from './components/client';
import { MisioneroColumn } from './components/columns';

const GruposPage = async () => {
  const misioneros = await prismadb.misionero.findMany({
    include: {
      grupo: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedMisionero: MisioneroColumn[] = misioneros.map((item) => ({
    id: item.id,
    name: item.name,
    apellido: item.apellido,
    email: item.email,
    numeroAlumno: item.numeroAlumno,
    edad: item.edad,
    tipoDocumento: item.tipoDocumento,
    numeroDocumento: item.numeroDocumento,
    carrera: item.carrera,
    numeroTelefono: item.numeroTelefono,
    grupoId: item?.grupoId,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-1 p-8 pt-6">
        <MisioneroClient data={formattedMisionero} />
      </div>
    </div>
  );
};

export default GruposPage;
