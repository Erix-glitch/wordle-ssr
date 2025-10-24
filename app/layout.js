import './globals.css';
import { Word } from './Word.js'

const [solution] = await Word();

export const metadata = {
  title: "Wordle Solution",
  description: "Today's Wordle Solution: ".concat(solution.toUpperCase()),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
