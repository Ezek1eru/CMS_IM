import '@/styles/globals.css';

import Navbar from './_components/Navbar';

const metadata = {
  title: 'IM',
  description: 'Instituto Misionero',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
