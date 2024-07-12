import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "./Components/Header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Content Generation Platform",
  description: "Sign in and generate content with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}