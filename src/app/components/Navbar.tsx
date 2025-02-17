"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Briefcase, FolderGit2, Users, Mail, Github, Linkedin, Twitter, ChevronRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const menuItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Services", href: "/services", icon: Briefcase },
  { name: "Portfolio", href: "/portfolio", icon: FolderGit2 },
  { name: "About", href: "/about", icon: Users },
  { name: "Contact", href: "/contact", icon: Mail },
];

const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const menuItemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: -20,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-gray-900/80 backdrop-blur-lg shadow-lg"
            : "bg-gray-900"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-300 hover:bg-gray-800"
              >
                <Menu className="h-6 w-6" />
              </motion.button>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 md:ml-0"
              >
                <Link href="/" className="flex items-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
                    DreamDeploy
                  </span>
                </Link>
              </motion.div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <Link
                      href={item.href}
                      className={`relative text-sm font-medium transition-colors ${
                        isActive
                          ? "text-purple-400"
                          : "text-gray-300 hover:text-purple-400"
                      }`}
                    >
                      {item.name}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-active"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-400"
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="fixed inset-y-0 left-0 z-50 w-80 md:hidden bg-gray-900 shadow-xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                  <span className="text-xl font-bold text-white">Menu</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-gray-300 hover:bg-gray-800"
                  >
                    <X className="h-6 w-6" />
                  </motion.button>
                </div>

                <div className="flex-1 px-6 py-8 overflow-y-auto">
                  <nav className="space-y-6">
                    <div className="space-y-4">
                      {menuItems.map((item, index) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                          <motion.div
                            key={item.name}
                            variants={menuItemVariants}
                            custom={index}
                            initial="closed"
                            animate="open"
                            exit="closed"
                          >
                            <Link
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`group flex items-center p-3 text-lg font-medium rounded-lg transition-colors ${
                                isActive
                                  ? "bg-purple-500/10 text-purple-400"
                                  : "text-gray-300 hover:bg-gray-800 hover:text-purple-400"
                              }`}
                            >
                              <Icon className="h-5 w-5 mr-3" />
                              <span>{item.name}</span>
                              <ChevronRight className="h-5 w-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>

                    <div className="pt-6 border-t border-gray-800">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-300">Switch Theme</span>
                        <ThemeToggle />
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-800">
                      <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                        Connect With Us
                      </h3>
                      <div className="flex items-center space-x-4">
                        {socialLinks.map((social) => {
                          const Icon = social.icon;
                          return (
                            <motion.a
                              key={social.name}
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 text-gray-300 hover:text-purple-400 transition-colors"
                            >
                              <Icon className="h-6 w-6" />
                            </motion.a>
                          );
                        })}
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
