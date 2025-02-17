import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/lib/auth-context";
import { Footer } from "@/components/ui/footer";
import ClientLayout from "@/components/client-layout";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "DreamDeploy - Student Project Development",
  description: "Get your BTech final year project developed by experienced developers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <AuthProvider>
            <div className="min-h-screen bg-gray-900 flex flex-col">
              <ClientLayout>{children}</ClientLayout>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}