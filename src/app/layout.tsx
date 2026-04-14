import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "中国节假日查询",
  description: "基于 holidayAPI.json 的中国节假日与调休查询网站",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <head>
        <link rel="icon" href="/eo-logo-blue.svg" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
