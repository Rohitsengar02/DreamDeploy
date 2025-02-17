"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Briefcase,
  Users,
  Mail,
  Settings,
  HelpCircle,
  FileText,
  Code,
  Cpu,
  Database,
  Server,
  Smartphone,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { name: "Home", icon: <Home className="h-5 w-5" />, href: "/" },
  { name: "Services", icon: <Briefcase className="h-5 w-5" />, href: "/services" },
  { name: "Portfolio", icon: <Code className="h-5 w-5" />, href: "/portfolio" },
  { name: "About Us", icon: <Users className="h-5 w-5" />, href: "/about" },
  { name: "Contact", icon: <Mail className="h-5 w-5" />, href: "/contact" },
  { name: "Documentation", icon: <FileText className="h-5 w-5" />, href: "/docs" },
  { name: "Help & Support", icon: <HelpCircle className="h-5 w-5" />, href: "/support" },
  { name: "Settings", icon: <Settings className="h-5 w-5" />, href: "/settings" },
];

const technologies = [
  { name: "Web Apps", icon: <Server className="h-5 w-5" />, href: "/services/web" },
  { name: "Mobile Apps", icon: <Smartphone className="h-5 w-5" />, href: "/services/mobile" },
  { name: "Machine Learning", icon: <Cpu className="h-5 w-5" />, href: "/services/ml" },
  { name: "Database", icon: <Database className="h-5 w-5" />, href: "/services/database" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-900/50 backdrop-blur-sm text-white md:hidden"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        className="fixed md:static inset-y-0 left-0 z-40 w-72 bg-gray-950 text-white shadow-xl md:shadow-none md:translate-x-0 transition-transform duration-300"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
                DreamDeploy
              </span>
            </Link>
          </div>

          {/* Main Menu */}
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            <div className="py-2">
              <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Main Menu
              </h3>
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.name} href={item.href}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center px-3 py-2 mt-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-purple-600 text-white"
                          : "text-gray-400 hover:text-white hover:bg-gray-800"
                      }`}
                    >
                      <span className={`${isActive ? "text-white" : "text-gray-400"}`}>
                        {item.icon}
                      </span>
                      <span className="ml-3">{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute right-0 w-1 h-6 bg-white rounded-l-full"
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Technologies */}
            <div className="py-2">
              <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Technologies
              </h3>
              {technologies.map((tech) => {
                const isActive = pathname === tech.href;
                return (
                  <Link key={tech.name} href={tech.href}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center px-3 py-2 mt-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-purple-600 text-white"
                          : "text-gray-400 hover:text-white hover:bg-gray-800"
                      }`}
                    >
                      <span className={`${isActive ? "text-white" : "text-gray-400"}`}>
                        {tech.icon}
                      </span>
                      <span className="ml-3">{tech.name}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Profile */}
          <div className="p-4 mt-auto">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-900">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-medium">
                  A
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-white">Admin User</div>
                <div className="text-xs text-gray-400">admin@dreamdeploy.com</div>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
        />
      )}
    </>
  );
}
