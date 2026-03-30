import { Inter, Source_Sans_3, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import ScrollToTop from '@/components/layout/ScrollToTop';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans-3',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSans3.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen overflow-x-hidden">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
