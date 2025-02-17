"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const projects = [
  {
    title: "E-Learning Platform",
    description: "A complete learning management system with live classes and quizzes",
    image: "/projects/elearning.jpg",
    tech: ["React", "Node.js", "MongoDB"],
    category: "Web Development",
  },
  {
    title: "AI Image Generator",
    description: "Generate unique images using artificial intelligence and deep learning",
    image: "/projects/ai.jpg",
    tech: ["Python", "TensorFlow", "Flask"],
    category: "Machine Learning",
  },
  {
    title: "IoT Smart Home",
    description: "Control your home devices with voice commands and mobile app",
    image: "/projects/iot.jpg",
    tech: ["Arduino", "React Native", "Firebase"],
    category: "IoT",
  },
];

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 p-1"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-1 rounded-xl bg-white dark:bg-gray-900 p-6 shadow-xl"
      >
        <div className="relative h-40 w-full rounded-lg bg-gray-100 dark:bg-gray-800">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div
          style={{
            transform: "translateZ(50px)",
          }}
          className="mt-4"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {project.description}
          </p>
          <div className="mt-4">
            <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
              {project.category}
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900/30 px-2.5 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectShowcase() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300"
          >
            Check out some of our recent student projects
          </motion.p>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
