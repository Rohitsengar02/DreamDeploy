"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ActionButtonProps {
  text: string;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export function ActionButton({ text, href, variant = "primary", className = "" }: ActionButtonProps) {
  const router = useRouter();
  const { user, signInWithGoogle } = useAuth();

  const handleClick = async () => {
    if (user) {
      router.push(href);
    } else {
      try {
        await signInWithGoogle();
        router.push(href);
      } catch (error) {
        console.error("Failed to sign in:", error);
      }
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={`
        group flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
        ${variant === "primary" 
          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700" 
          : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
        }
        ${className}
      `}
    >
      {text}
      <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
    </motion.button>
  );
}
