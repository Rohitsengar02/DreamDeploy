"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ActionButton } from "@/components/ui/action-button";

const plans = [
  {
    name: "Basic",
    price: "₹1,000",
    description: "Perfect for simple college projects",
    features: [
      "Basic project implementation",
      "Standard documentation",
      "Email support",
      "1 revision",
      "Source code access",
    ],
    href: "/dashboard/project-form?plan=basic"
  },
  {
    name: "Premium",
    price: "₹2,500",
    description: "Ideal for complex final year projects",
    features: [
      "Advanced project implementation",
      "Detailed documentation",
      "Priority email & chat support",
      "3 revisions",
      "Source code with comments",
      "Project presentation",
      "Live demo setup",
    ],
    popular: true,
    href: "/dashboard/project-form?plan=premium"
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For research projects & thesis work",
    features: [
      "Custom project development",
      "Research paper documentation",
      "24/7 priority support",
      "Unlimited revisions",
      "Detailed code documentation",
      "Presentation & defense prep",
      "Publication assistance",
      "Lifetime support",
    ],
    href: "/dashboard/contact?type=enterprise"
  },
];

export function Pricing() {
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
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-lg text-gray-600 dark:text-gray-300"
          >
            Choose the perfect plan for your project needs
          </motion.p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative rounded-2xl bg-white dark:bg-gray-800 shadow-lg ${
                plan.popular
                  ? "ring-2 ring-purple-600 scale-105 lg:scale-110"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-2 text-sm font-medium text-white text-center">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  {plan.description}
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  {plan.name !== "Enterprise" && (
                    <span className="text-base font-medium text-gray-500 dark:text-gray-400">
                      /project
                    </span>
                  )}
                </p>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-purple-600" />
                      <span className="ml-3 text-gray-600 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <ActionButton
                    text={plan.name === "Enterprise" ? "Contact Us" : "Get Started"}
                    href={plan.href}
                    variant={plan.popular ? "primary" : "secondary"}
                    className="w-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
