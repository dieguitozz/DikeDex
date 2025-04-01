import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dikédex | Developed by Diego Silva Dias",
  description: "Uma enciclopédia digital dos Pokémon",
  icons: {
    icon: "/pokeball.png",
  },
};
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
