import prismadb from '@/lib/prismadb';
import { MisioneroForm } from './components/misionero-form';

const MisioneroPage = async ({
  params,
}: {
  params: { misioneroId: string };
}) => {
  const misioneros = await prismadb.misionero.findUnique({
    where: {
      id: params.misioneroId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MisioneroForm initialData={misioneros} />
      </div>
    </div>
  );
};

export default MisioneroPage;