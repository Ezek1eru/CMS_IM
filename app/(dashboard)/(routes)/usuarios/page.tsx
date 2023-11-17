import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';

import { UserClient } from './components/user';
import { UsuarioColumn } from './components/columns';

const GruposPage = async () => {
  const users = await prismadb.user.findMany({
    include: {
      grupo: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedUsuario: UsuarioColumn[] = users.map((item) => ({
    id: item.id,
    name: item.name,
    //apellido: item.apellido,
    email: item.email,
    //numeroAlumno: item.numeroAlumno,
    //edad: item.edad,
    //tipoDocumento: item.tipoDocumento,
    //numeroDocumento: item.numeroDocumento,
    //carrera: item.carrera,
    //numeroTelefono: item.numeroTelefono,
    grupoId: item?.grupoId,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-1 p-8 pt-6">
        <UserClient data={formattedUsuario} />
      </div>
    </div>
  );
};

export default GruposPage;
