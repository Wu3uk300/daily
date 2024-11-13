import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "@/styles/normalize.css";

const roboto = Quicksand({
  weight: "500",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daily",
  description: "Created By Maksym Kondratov",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
