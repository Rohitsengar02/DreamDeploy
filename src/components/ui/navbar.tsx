"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, User, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const { user, signInWithGoogle, logout } = useAuth();
  const isDashboard = pathname.startsWith("/dashboard");

  // If on dashboard route and authenticated, show simplified navbar for mobile
  if (isDashboard && user) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 md:hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
                DreamDeploy
              </span>
            </Link>
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-1 rounded-full hover:bg-gray-800 transition-colors"
              >
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <span className="text-sm font-medium text-purple-400">
                      {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                    </span>
                  </div>
                )}
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsProfileOpen(false)}
                      className="fixed inset-0 z-40"
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50"
                    >
                      <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center space-x-3">
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
                      </div>
                      <div className="p-2">
                        <Link
                          href="/dashboard/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Profile Settings</span>
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Regular navbar for non-dashboard routes or unauthenticated users
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
              DreamDeploy
            </span>
          </Link>

          {/* Desktop Navigation - Hide on dashboard for larger screens */}
          {!isDashboard && (
            <div className="hidden md:flex md:items-center md:space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "text-purple-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="flex items-center space-x-4">
                {!user ? (
                  <button
                    onClick={() => signInWithGoogle()}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </button>
                ) : (
                  <>
                    <Link
                      href="/dashboard"
                      className="flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900"
                    >
                      Dashboard
                    </Link>
                    <div className="relative">
                      <button 
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="p-1 rounded-full hover:bg-gray-800 transition-colors"
                      >
                        {user.photoURL ? (
                          <Image
                            src={user.photoURL}
                            alt="Profile"
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <span className="text-sm font-medium text-purple-400">
                              {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                            </span>
                          </div>
                        )}
                      </button>

                      {/* Profile Dropdown */}
                      <AnimatePresence>
                        {isProfileOpen && (
                          <>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              onClick={() => setIsProfileOpen(false)}
                              className="fixed inset-0 z-40"
                            />
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50"
                            >
                              <div className="p-4 border-b border-gray-700">
                                <div className="flex items-center space-x-3">
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
                              </div>
                              <div className="p-2">
                                <Link
                                  href="/dashboard/profile"
                                  onClick={() => setIsProfileOpen(false)}
                                  className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                  <Settings className="w-4 h-4" />
                                  <span>Profile Settings</span>
                                </Link>
                                <button
                                  onClick={() => {
                                    logout();
                                    setIsProfileOpen(false);
                                  }}
                                  className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                  <LogOut className="w-4 h-4" />
                                  <span>Logout</span>
                                </button>
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Mobile menu button - Only show for non-dashboard or unauthenticated */}
          {(!isDashboard || !user) && (
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === item.href
                      ? "text-white bg-gray-900"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {!user ? (
                <button
                  onClick={() => {
                    signInWithGoogle();
                    setIsOpen(false);
                  }}
                  className="w-full mt-2 flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </button>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    className="block w-full mt-2 text-center px-4 py-2 text-base font-medium text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <div className="relative mt-2">
                    <button 
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg"
                    >
                      {user.photoURL ? (
                        <Image
                          src={user.photoURL}
                          alt="Profile"
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <span className="text-sm font-medium text-purple-400">
                            {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                          </span>
                        </div>
                      )}
                      <span>Profile</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
