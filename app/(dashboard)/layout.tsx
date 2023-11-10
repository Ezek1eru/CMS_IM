import { useSession } from 'next-auth/react';

import Navbar from '@/components/Navbar';
import { Providers } from '@/components/providers/providers';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Providers>
        <Navbar />
        {children}
      </Providers>
    </>
  );
}
