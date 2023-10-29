import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <div>Active user: {JSON.stringify(session)}</div>
      <div>IdUser: {session?.user?.id}</div>
    </div>
  );
};

export default DashboardPage;
