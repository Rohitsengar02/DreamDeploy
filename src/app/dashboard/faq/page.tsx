"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";

const faqs = [
  {
    question: "What is DreamDeploy?",
    answer:
      "DreamDeploy is a cutting-edge platform that helps developers and teams streamline their project deployment process. We provide tools and services to make deployment faster, more reliable, and stress-free.",
  },
  {
    question: "How do I get started with DreamDeploy?",
    answer:
      "Getting started is easy! Simply sign up for an account, connect your project repository, and follow our step-by-step guide to set up your first deployment. Our intuitive interface will guide you through the process.",
  },
  {
    question: "What deployment platforms do you support?",
    answer:
      "We support all major cloud platforms including AWS, Google Cloud, Azure, and DigitalOcean. We also support custom deployment targets through our flexible deployment configuration system.",
  },
  {
    question: "Is DreamDeploy suitable for small projects?",
    answer:
      "Absolutely! DreamDeploy is designed to scale with your needs. Whether you're working on a small personal project or a large enterprise application, our platform can accommodate your requirements.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "We offer 24/7 technical support through our help desk, comprehensive documentation, video tutorials, and a community forum. Enterprise customers also get access to dedicated support representatives.",
  },
  {
    question: "How secure is DreamDeploy?",
    answer:
      "Security is our top priority. We use industry-standard encryption, regular security audits, and follow best practices for protecting your data and deployments. All sensitive information is encrypted at rest and in transit.",
  },
  {
    question: "Can I customize my deployment workflow?",
    answer:
      "Yes! DreamDeploy offers highly customizable deployment workflows. You can create custom scripts, set up deployment conditions, and integrate with your existing CI/CD pipeline.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes, we offer a 14-day free trial with full access to all features. No credit card required. You can upgrade to a paid plan at any time during or after the trial period.",
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about DreamDeploy. Can't find what
            you're looking for? Feel free to contact our support team.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden"
            >
              <motion.button
                whileHover={{ backgroundColor: "rgba(107, 114, 128, 0.1)" }}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between"
              >
                <span className="text-white font-medium">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-300">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {filteredFaqs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <p className="text-gray-400">
                No questions found matching your search.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
