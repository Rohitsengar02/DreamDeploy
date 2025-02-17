"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileCode,
  Users,
  Settings,
  BarChart,
  Mail,
  Menu,
  X,
  LogOut,
  Bell,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Projects", href: "/dashboard/projects", icon: FileCode },
  { name: "Team", href: "/dashboard/team", icon: Users },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart },
  { name: "Messages", href: "/dashboard/messages", icon: Mail },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function SharedNavigation({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!user) {
    return (
      <nav className="flex items-center space-x-8">
        <Link
          href="/"
          className="text-gray-300 hover:text-white transition-colors"
        >
          Home
        </Link>
        <Link
          href="/auth"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Sign In
        </Link>
      </nav>
    );
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-gray-800 z-30 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-gray-400 hover:bg-gray-700"
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
            DreamDeploy
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-700 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "User"}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
              <span className="text-purple-400 font-medium">
                {user?.displayName?.[0] || "U"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: isSidebarOpen ? 0 : isMobile ? -320 : -240,
          width: isMobile ? 320 : 240,
        }}
        className="fixed top-0 left-0 h-full bg-gray-800 z-30 overflow-hidden border-r border-gray-700/50"
      >
        <div className="flex flex-col h-full">
          {/* Logo - Hidden on mobile */}
          <div className="hidden md:flex items-center justify-between h-16 px-4">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
              DreamDeploy
            </span>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg text-gray-400 hover:bg-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Sidebar Header */}
          <div className="md:hidden flex items-center justify-between h-16 px-4 border-b border-gray-700">
            <span className="text-xl font-bold text-white">Menu</span>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg text-gray-400 hover:bg-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center px-3 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-purple-500/10 text-purple-400"
                        : "text-gray-400 hover:bg-gray-700 hover:text-purple-400"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="ml-3">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute left-0 w-1 h-8 bg-purple-400 rounded-r-full"
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <span className="text-purple-400 font-medium text-lg">
                    {user?.displayName?.[0] || "U"}
                  </span>
                </div>
              )}
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">
                  {user?.displayName || "User"}
                </p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-purple-400"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Wrapper */}
      <motion.div
        animate={{
          marginLeft: 0,
          marginTop: isMobile ? "64px" : 0,
        }}
        className="min-h-screen transition-all duration-300"
      >
        {children}
      </motion.div>
    </>
  );
}
