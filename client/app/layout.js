import localFont from "next/font/local";
import "./globals.css";
import { Search } from "lucide-react";
import { SearchProvider } from "@/contexts/SearchContext";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "ArtsKhonnect",
  description: "READY TO EXPLORE THE WORLD OF DANCE?",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <AuthProvider > <SearchProvider>{children}</SearchProvider> </AuthProvider>
      </body>
    </html>
  );
}
