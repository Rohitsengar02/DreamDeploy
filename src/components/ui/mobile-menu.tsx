"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquare,
  FolderPlus,
  Contact,
  HelpCircle,
  User,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const menuItems = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/dashboard/messages",
    icon: MessageSquare,
    label: "Messages",
  },
  {
    href: "/dashboard/project-form",
    icon: FolderPlus,
    label: "New Project",
  },
  {
    href: "/dashboard/contact",
    icon: Contact,
    label: "Contact",
  },
  {
    href: "/dashboard/faq",
    icon: HelpCircle,
    label: "FAQ",
  },
];

export default function MobileMenu() {
  const pathname = usePathname();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 z-50"
    >
      <div className="flex items-center justify-around p-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center py-2 px-3 rounded-lg relative"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-purple-500/20 rounded-lg"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <item.icon
                className={`w-5 h-5 mb-1 relative z-10 transition-colors ${
                  isActive ? "text-purple-400" : "text-gray-400"
                }`}
              />
              <span
                className={`text-[10px] relative z-10 transition-colors ${
                  isActive ? "text-purple-400" : "text-gray-400"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
