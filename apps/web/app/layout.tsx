import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';

import '../styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen w-full flex-col">
          <div className="grid h-screen w-full pl-[56px]">
            <Sidebar />
            <div className="flex flex-col">
              <Header />
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
