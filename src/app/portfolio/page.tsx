"use client";

import { motion } from "framer-motion";
import { Eye, Github, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    title: "Smart Healthcare System",
    description: "AI-powered healthcare management system with patient monitoring and diagnosis assistance",
    image: "/projects/healthcare.jpg",
    technologies: ["React", "Python", "TensorFlow", "MongoDB"],
    demoUrl: "#",
    githubUrl: "#",
    category: "Machine Learning",
  },
  {
    title: "E-Learning Platform",
    description: "Interactive learning platform with live classes and course management",
    image: "/projects/elearning.jpg",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "WebRTC"],
    demoUrl: "#",
    githubUrl: "#",
    category: "Web Development",
  },
  {
    title: "IoT Home Automation",
    description: "Smart home automation system with mobile app control",
    image: "/projects/iot.jpg",
    technologies: ["React Native", "Arduino", "MQTT", "Firebase"],
    demoUrl: "#",
    githubUrl: "#",
    category: "IoT",
  },
  {
    title: "Blockchain Voting System",
    description: "Secure and transparent voting system using blockchain technology",
    image: "/projects/blockchain.jpg",
    technologies: ["Solidity", "React", "Web3.js", "Ethereum"],
    demoUrl: "#",
    githubUrl: "#",
    category: "Blockchain",
  },
];

const categories = ["All", "Web Development", "Machine Learning", "IoT", "Blockchain"];

export default function PortfolioPage() {
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
            Our Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300"
          >
            Explore our successfully completed student projects
          </motion.p>
        </div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-600/90 text-white">
                    <Tag className="h-4 w-4 mr-1" />
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <Link
                    href={project.demoUrl}
                    className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Live Demo
                  </Link>
                  <Link
                    href={project.githubUrl}
                    className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <Github className="h-4 w-4 mr-1" />
                    Source Code
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
