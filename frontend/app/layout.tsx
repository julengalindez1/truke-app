import type { Metadata } from 'next'
import './globals.css'
import {Navbar, Footer} from "@/components";
import Head from "next/head";


export const metadata: Metadata = {
  title: 'Truke',
  description: 'Conectando productores y consumidores',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow mt-16 mb-10">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
