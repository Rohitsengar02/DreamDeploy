"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquare,
  FolderPlus,
  Contact,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const menuItems = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    description: "Overview of your projects",
  },
  {
    href: "/dashboard/messages",
    icon: MessageSquare,
    label: "Messages",
    description: "Chat with project team",
  },
  {
    href: "/dashboard/project-form",
    icon: FolderPlus,
    label: "New Project",
    description: "Submit a new project",
  },
  {
    href: "/dashboard/contact",
    icon: Contact,
    label: "Contact",
    description: "Get in touch with us",
  },
  {
    href: "/dashboard/faq",
    icon: HelpCircle,
    label: "FAQ",
    description: "Frequently asked questions",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="h-full bg-gray-900 border-r border-gray-800 w-64 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2"
        >
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
            DreamDeploy
          </span>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className={`group flex items-center gap-3 px-3 py-3 rounded-lg transition-colors relative ${
                  isActive 
                    ? "text-purple-400 bg-purple-500/10" 
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-purple-500/10 rounded-lg"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
                <div className={`p-2 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-purple-500/20 text-purple-400" 
                    : "bg-gray-800/50 text-gray-400 group-hover:text-white"
                }`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 relative">
                  <div className="font-medium relative z-10">{item.label}</div>
                  <div className="text-sm text-gray-500 group-hover:text-gray-400 relative z-10">
                    {item.description}
                  </div>
                </div>
                <ChevronRight className={`w-5 h-5 transition-transform ${
                  isActive ? "rotate-90 text-purple-400" : "text-gray-600 group-hover:text-gray-400"
                }`} />
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* User Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <span className="text-sm font-medium text-purple-400">
                {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user.displayName || 'User'}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {user.email}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </motion.div>
    </div>
  );
}
