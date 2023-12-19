import type { Metadata } from 'next'
import { GeistSans } from "geist/font";
import './globals.css'
import { Header } from '@/components/Header';
import { cn } from '@/lib/utils';
import { Footer } from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Students Achievments System',
  description: 'System for students to gain additional points for their activity',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(GeistSans.className, "flex flex-col bg-blue-950 min-h-screen")}>
        <Header/>
        <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 md:px-[60px] py-6">
          {children}
        </main>
        <Footer/>
        <Toaster position='top-right' containerStyle={{top: 90}}/>
      </body>
    </html>
  )
}
