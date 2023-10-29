import { Inter } from 'next/font/google';

import { Providers } from '@/providers/providers';
import { ToastProvider } from '@/providers/toast-provider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Instituto Misionero',
  description: 'Instituto Misionero',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ToastProvider />
          {children}
        </Providers>
      </body>
    </html>
  );
}
