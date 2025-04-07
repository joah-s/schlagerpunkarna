import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Viga } from "next/font/google";
import { Metadata } from 'next';

const viga = Viga({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: 'Schlagerpunkarna',
  description: 'Schlagerpunkarna - Anarkism och tonartshöjningar sedan 2018.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
