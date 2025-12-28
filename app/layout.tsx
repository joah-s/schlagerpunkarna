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
    <html lang="sv">
      <body className={`${inter.className} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow-lg"
        >
          Hoppa till innehåll
        </a>
        {children}
      </body>
    </html>
  );
}
