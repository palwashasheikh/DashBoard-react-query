import './globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import ReactQueryProvider from '@/components/providers/react-query-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next Dashboard',
  description: 'A post management dashboard with Next.js',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
