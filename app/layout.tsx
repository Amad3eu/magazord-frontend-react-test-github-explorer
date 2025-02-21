import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/context/ThemeContext";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} bg-white dark:bg-gray-900`}
    >
      <head>
        <title>GitHub Repo Explorer</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-white dark:bg-gray-900 dark:text-white">
        <ThemeProvider>
          <Header />
          <Suspense fallback={<Loading />}>
            <main className="min-h-screen p-8 pb-20 sm:p-20 flex flex-col gap-8 items-center sm:items-start bg-white dark:bg-gray-900">
              {children}
            </main>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
