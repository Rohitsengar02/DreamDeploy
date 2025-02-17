import { BackgroundBeams } from "./components/ui/background-beams";
import { TextGenerateEffect } from "./components/ui/text-generate-effect";
import { Testimonials } from "./components/sections/Testimonials";
import { FAQ } from "./components/sections/FAQ";
import { Pricing } from "./components/sections/Pricing";
import { ProjectShowcase } from "./components/sections/ProjectShowcase";
import { Contact } from "./components/sections/Contact";
import { Hero } from "./components/sections/Hero";
import { FloatingChat } from "./components/ui/floating-chat";
import { ScrollProgress } from "./components/ui/scroll-progress";
import { PageTransition } from "./components/ui/page-transition";
import Link from "next/link";

export default function Home() {
  return (
    <PageTransition>
      <main className="min-h-screen">
        <ScrollProgress />
        
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                Why Choose DreamDeploy?
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                We make your project development journey smooth and hassle-free
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Expert Developers",
                  description: "Our team consists of experienced developers who understand academic requirements",
                },
                {
                  title: "Quick Delivery",
                  description: "Get your project completed within 2-4 weeks with regular updates",
                },
                {
                  title: "Complete Solution",
                  description: "Receive source code, documentation, and presentation materials",
                },
                {
                  title: "Affordable Pricing",
                  description: "Student-friendly prices with flexible payment options",
                },
                {
                  title: "24/7 Support",
                  description: "Get assistance anytime via email, chat, or phone",
                },
                {
                  title: "Free Revisions",
                  description: "Multiple rounds of modifications to meet your requirements",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="relative p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl hover:shadow-lg transition-shadow animated-border group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
                  <div className="relative p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Showcase Section */}
        <ProjectShowcase />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Pricing Section */}
        <div id="pricing">
          <Pricing />
        </div>

        {/* FAQ Section */}
        <FAQ />

        {/* Contact Section */}
        <Contact />

        {/* CTA Section */}
        <section className="relative py-16">
          <BackgroundBeams />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-8">
              Ready to Start Your Project?
            </h2>
            <Link
              href="/auth"
              className="inline-flex items-center px-8 py-4 rounded-full text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 text-lg font-medium transform hover:scale-105 active:scale-95"
            >
              Get Started Now
            </Link>
          </div>
        </section>

        {/* Floating Chat */}
        <FloatingChat />
      </main>
    </PageTransition>
  );
}