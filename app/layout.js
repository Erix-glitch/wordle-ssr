import './globals.css';

export const metadata = {
  title: "Wordle",
  description: "Today's Wordle solution",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
