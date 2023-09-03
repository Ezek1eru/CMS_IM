import Navbar from '@/components/user/navbarUser';
import prismadb from '@/lib/prismadb';

export default async function DashboardLayout({
  children,
  params,
}: {
  params: { grupoId: string };
  children: React.ReactNode;
}) {
  const grupos = await prismadb.grupo.findUnique({
    where: {
      id: params.grupoId,
    },
  });

  return (
    <>
      <Navbar data={grupos?.name} />
      {children}
    </>
  );
}
