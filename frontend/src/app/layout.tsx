import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Bestiário-X",
  description: "Organize seu bestiário e crie seus próprios monstros para sua campanha!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={montserrat.className}>
      <body>
        {children}
      </body>
    </html>
  );
}