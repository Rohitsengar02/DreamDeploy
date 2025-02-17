"use client";

import { motion } from "framer-motion";
import { Code, Smartphone, Database, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: <Code className="h-8 w-8" />,
    title: "Web Development",
    description: "Custom web applications using modern frameworks like React, Next.js, and Node.js",
    href: "/services/web",
    technologies: ["React", "Next.js", "Node.js", "TypeScript"],
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications for iOS and Android",
    href: "/services/mobile",
    technologies: ["React Native", "Flutter", "iOS", "Android"],
  },
  {
    icon: <Cpu className="h-8 w-8" />,
    title: "Machine Learning",
    description: "AI and ML solutions for data analysis and predictive modeling",
    href: "/services/ml",
    technologies: ["Python", "TensorFlow", "PyTorch", "Scikit-learn"],
  },
  {
    icon: <Database className="h-8 w-8" />,
    title: "Database Solutions",
    description: "Database design, optimization, and management solutions",
    href: "/services/database",
    technologies: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300"
          >
            Professional development services for your final year projects
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200" />
              <Link href={service.href}>
                <div className="relative p-8 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-shrink-0 bg-purple-600/10 p-3 rounded-lg">
                      <div className="text-purple-600 dark:text-purple-400">
                        {service.icon}
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {service.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Ready to Start Your Project?
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Get in touch with us to discuss your project requirements
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center px-6 py-3 rounded-full text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
          >
            Contact Us
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
