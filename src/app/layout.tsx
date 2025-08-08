import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "My Blog",
  description: "Portfolio & Tech Blog",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <main className="mx-auto max-w-4xl p-4">{children}</main>
      </body>
    </html>
  );
}