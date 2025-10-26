import './globals.css';
import { Geist, Geist_Mono, Libre_Franklin } from "next/font/google";
import { Word } from './Word.js';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"]
});

export async function generateMetadata() {
  const { solution } = await Word();
  return {
    title: "Wordle Solution",
    description: `Today's Wordle Solution: ${solution.toUpperCase()}`,
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${libreFranklin.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}