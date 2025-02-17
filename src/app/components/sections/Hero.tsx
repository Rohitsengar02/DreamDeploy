"use client";

import { motion } from "framer-motion";
import { GridPattern } from "../ui/grid-pattern";
import { Code, Sparkles, Zap } from "lucide-react";
import { ActionButton } from "@/components/ui/action-button";

const features = [
  {
    icon: <Code className="h-5 w-5" />,
    title: "Clean Code",
    description: "Well-structured & documented",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Fast Delivery",
    description: "2-4 weeks turnaround",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Modern Stack",
    description: "Latest technologies",
  },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gray-950">
      <GridPattern />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight">
              <span className="text-white">Transform Your </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
                Project Ideas
              </span>
              <br />
              <span className="text-white">into </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                Reality
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Get your BTech final year project developed by experienced developers.
            Professional development at student-friendly prices.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <ActionButton
              text="Start Your Project"
              href="/dashboard/project-form"
              variant="primary"
              className="sm:w-auto"
            />
            <ActionButton
              text="View Projects"
              href="/dashboard"
              variant="secondary"
              className="sm:w-auto"
            />
          </motion.div>

          {/* Features */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200" />
                <div className="relative p-6 bg-gray-900 rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto bg-purple-600/20 rounded-lg text-purple-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-float" />
      </div>
    </section>
  );
}
