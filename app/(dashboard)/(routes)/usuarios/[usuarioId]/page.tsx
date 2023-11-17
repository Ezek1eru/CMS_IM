import prismadb from '@/lib/prismadb';
import { UsuarioForm } from './components/usuarios-form';

const UsuarioPage = async ({
  params,
}: {
  params: { UsuarioId: string };
}) => {
  const usuarios = await prismadb.user.findUnique({
    where: {
      id: params.UsuarioId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UsuarioForm initialData={usuarios} />
      </div>
    </div>
  );
};

export default UsuarioPage