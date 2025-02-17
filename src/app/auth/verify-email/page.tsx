"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { Loader2, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth');
      return;
    }

    // Check if email is already verified
    if (user.emailVerified) {
      router.push('/dashboard');
    }

    // Reload user to get latest verification status
    const checkVerification = async () => {
      try {
        await user.reload();
        if (user.emailVerified) {
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error checking verification status:', error);
      }
    };

    const interval = setInterval(checkVerification, 3000); // Check every 3 seconds

    return () => clearInterval(interval);
  }, [user, router]);

  const resendVerificationEmail = async () => {
    if (!user) return;
    
    setLoading(true);
    setError("");
    setMessage("");
    
    try {
      await sendEmailVerification(user, {
        url: window.location.origin + '/dashboard',
        handleCodeInApp: true
      });
      setMessage("Verification email sent! Please check your inbox.");
    } catch (error: any) {
      console.error("Error sending verification email:", error);
      if (error.code === 'auth/too-many-requests') {
        setError("Too many requests. Please wait a few minutes before trying again.");
      } else {
        setError(error?.message || "Failed to send verification email");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-700/30 via-gray-900 to-gray-900" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 relative"
      >
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
            {user.emailVerified ? (
              <CheckCircle className="w-8 h-8 text-green-400" />
            ) : (
              <Mail className="w-8 h-8 text-purple-400" />
            )}
          </div>
          <h2 className="mt-2 text-3xl font-bold text-white">
            {user.emailVerified ? "Email Verified!" : "Check your email"}
          </h2>
          <p className="mt-2 text-gray-400">
            {user.emailVerified 
              ? "Redirecting you to dashboard..."
              : `We've sent a verification link to ${user.email}. Click the link to verify your account.`
            }
          </p>
        </div>

        <div className="mt-8 space-y-6 bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
          {message && (
            <div className="bg-green-500/10 text-green-400 p-4 rounded-lg text-sm">
              {message}
            </div>
          )}
          
          {error && (
            <div className="bg-red-500/10 text-red-400 p-4 rounded-lg text-sm">
              {error}
            </div>
          )}

          {!user.emailVerified && (
            <div className="space-y-4">
              <button
                onClick={resendVerificationEmail}
                disabled={loading}
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Resend verification email"
                )}
              </button>

              <Link
                href="/auth"
                className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-gray-400 hover:text-white focus:outline-none transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to sign in
              </Link>
            </div>
          )}

          <div className="mt-4 text-center text-sm text-gray-500">
            <p>
              Make sure to check your spam folder if you don't see the email in your inbox.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
