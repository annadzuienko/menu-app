import "./globals.css";

export const metadata = {
  title: "NextJS Menu App",
  description: "A tool for creating and managing dynamic menu structures",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
