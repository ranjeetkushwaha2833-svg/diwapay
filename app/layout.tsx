
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DiwaPAY",
  description: "Welcome to DiwaPAY",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  );
}

