"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { Camera, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden"
      >
        {/* Header */}
        <div className="relative h-32 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="absolute -bottom-12 left-6 flex items-end space-x-4">
            <div className="relative">
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="rounded-full border-4 border-gray-900"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-purple-500/20 border-4 border-gray-900 flex items-center justify-center">
                  <span className="text-2xl font-medium text-purple-400">
                    {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                  </span>
                </div>
              )}
              <button
                className="absolute bottom-0 right-0 p-1.5 rounded-full bg-gray-900 text-gray-300 hover:text-white border border-gray-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Camera className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-16 px-6 pb-6">
          <h1 className="text-2xl font-bold text-white">
            {user.displayName || 'User'}
          </h1>
          <p className="text-gray-400">{user.email}</p>

          <div className="mt-8 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={user.displayName || ''}
                    disabled
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email || ''}
                    disabled
                    className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Account Settings</h2>
              <div className="space-y-4">
                <button
                  className="w-full px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete your account?')) {
                      // Add account deletion logic here
                    }
                  }}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
