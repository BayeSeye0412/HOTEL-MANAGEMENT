import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../contexts/ThemeContext";
import { SearchProvider } from "../components/AdminLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hotel Management - Gestion d'hôtels",
  description: "Application moderne de gestion d'hôtels",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <SearchProvider>
            {children}
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
