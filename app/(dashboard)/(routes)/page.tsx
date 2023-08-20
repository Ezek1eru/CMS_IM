import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  return <div>Active user: {JSON.stringify(session)}</div>;
};

export default DashboardPage;
