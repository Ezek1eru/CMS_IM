import prismadb from '@/lib/prismadb';
import { GrupoForm } from './components/grupo-form';

const BillboardPage = async ({ params }: { params: { grupoId: string } }) => {
  const grupo = await prismadb.grupo.findUnique({
    where: {
      id: params.grupoId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <GrupoForm initialData={grupo} />
      </div>
    </div>
  );
};

export default BillboardPage;
