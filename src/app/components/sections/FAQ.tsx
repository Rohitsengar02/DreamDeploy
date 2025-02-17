"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long does it take to complete a project?",
    answer: "Typically, we complete projects within 2-4 weeks, depending on the complexity. We'll provide you with a specific timeline after reviewing your requirements.",
  },
  {
    question: "What technologies do you work with?",
    answer: "We work with a wide range of technologies including React, Node.js, Python, Java, and more. We can adapt to your specific requirements and college guidelines.",
  },
  {
    question: "Do you provide project documentation?",
    answer: "Yes, we provide complete documentation including project report, synopsis, and presentation slides. All documentation follows standard academic formats.",
  },
  {
    question: "What is your pricing structure?",
    answer: "Our pricing starts from ₹1000 and varies based on project complexity. We offer flexible payment plans and student discounts.",
  },
  {
    question: "Do you provide source code?",
    answer: "Yes, you get complete access to the source code along with proper documentation and setup instructions.",
  },
  {
    question: "Can you help with project modifications?",
    answer: "Absolutely! We offer free minor modifications and reasonable rates for major changes after project delivery.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300"
          >
            Everything you need to know about our services
          </motion.p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mt-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="text-left font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-b-lg">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
