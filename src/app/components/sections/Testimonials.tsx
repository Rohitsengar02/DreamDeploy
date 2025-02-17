"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    content: "DreamDeploy helped me complete my final year project in just 2 weeks. The code quality was excellent!",
    author: "Rahul Sharma",
    role: "BTech Student, Delhi",
  },
  {
    content: "Amazing service! They understood my requirements perfectly and delivered exactly what I needed.",
    author: "Priya Patel",
    role: "MTech Student, Mumbai",
  },
  {
    content: "The team was very professional and responsive. They made my complex project look simple.",
    author: "Arun Kumar",
    role: "BTech Student, Bangalore",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl"
          >
            What Our Students Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300"
          >
            Join hundreds of satisfied students who trusted us with their projects
          </motion.p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
            >
              <Quote className="absolute -top-4 -left-4 h-8 w-8 text-purple-600 bg-white dark:bg-gray-800 rounded-full" />
              <blockquote className="mt-4">
                <p className="text-lg text-gray-800 dark:text-gray-200">
                  "{testimonial.content}"
                </p>
              </blockquote>
              <div className="mt-6 flex items-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.author[0]}
                </div>
                <div className="ml-4">
                  <div className="text-base font-medium text-gray-900 dark:text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
