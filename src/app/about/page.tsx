"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Users, Clock, Award } from "lucide-react";
import Image from "next/image";

const stats = [
  {
    icon: <Users className="h-6 w-6" />,
    value: "500+",
    label: "Happy Students",
  },
  {
    icon: <CheckCircle2 className="h-6 w-6" />,
    value: "1000+",
    label: "Projects Completed",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    value: "24/7",
    label: "Support Available",
  },
  {
    icon: <Award className="h-6 w-6" />,
    value: "100%",
    label: "Success Rate",
  },
];

const team = [
  {
    name: "John Doe",
    role: "Founder & CEO",
    image: "/team/john.jpg",
    bio: "10+ years of experience in software development and project management",
  },
  {
    name: "Jane Smith",
    role: "Lead Developer",
    image: "/team/jane.jpg",
    bio: "Expert in full-stack development with focus on modern web technologies",
  },
  {
    name: "Mike Johnson",
    role: "ML Engineer",
    image: "/team/mike.jpg",
    bio: "Specialized in AI/ML solutions with extensive research background",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl"
          >
            About DreamDeploy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            We are a team of passionate developers dedicated to helping students bring their project ideas to life
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-gray-800 px-6 py-8 rounded-lg text-center"
            >
              <div className="flex justify-center text-purple-600 dark:text-purple-400 mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-white dark:bg-gray-800 rounded-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            At DreamDeploy, we believe every student deserves access to professional development
            resources for their final year projects. Our mission is to bridge the gap between
            academic requirements and industry standards, helping students create projects that
            not only meet their academic criteria but also serve as valuable portfolio pieces
            for their future careers.
          </p>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Meet Our Team
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden group"
              >
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-purple-600 dark:text-purple-400 mb-4">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
