import prismadb from '@/lib/prismadb';

const PaginaIndicudialGrupo = async ({
  params,
}: {
  params: { grupoId: string };
}) => {
  const grupo = await prismadb.grupo.findUnique({
    where: {
      id: params.grupoId,
    },
  });

  return <div>Grupo: {grupo?.name}</div>;
};

export default PaginaIndicudialGrupo;
