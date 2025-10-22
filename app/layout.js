import './globals.css';

export const metadata = {
  title: "Wordle SSR",
  description: "Server-rendered Wordle solution using Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
