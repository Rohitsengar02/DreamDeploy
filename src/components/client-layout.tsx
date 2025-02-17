"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/ui/navbar";
import MobileMenu from "@/components/ui/mobile-menu";
import { useAuth } from "@/lib/auth-context";
import emailjs from '@emailjs/browser';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const { user } = useAuth();

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init('uDHwReKU7E6T0l0S2');
  }, []);

  return (
    <>
      {/* Show navbar only on mobile for dashboard routes, always show for other routes */}
      <div className={`${isDashboard ? 'md:hidden' : ''}`}>
        <Navbar />
      </div>
      <main className={`flex-grow pt-16 ${user && isDashboard ? 'pb-20 md:pb-0' : ''}`}>
        {children}
      </main>
      {user && isDashboard && <MobileMenu />}
    </>
  );
}
