"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import { collection, addDoc, updateDoc, serverTimestamp, doc } from "firebase/firestore";
import emailjs from '@emailjs/browser';
import { 
  ChevronRight, 
  ChevronLeft, 
  Upload, 
  Calendar, 
  DollarSign,
  Laptop,
  GraduationCap,
  FileText,
  Phone,
  Loader2
} from "lucide-react";

const technologies = [
  "React", "Next.js", "Node.js", "Python", "Django",
  "Flask", "Java", "Spring Boot", "Angular", "Vue.js",
  "PHP", "Laravel", "MongoDB", "PostgreSQL", "MySQL",
  "Firebase", "AWS", "Docker", "Kubernetes", "Other"
];

interface FormData {
  studentDetails: {
    name: string;
    college: string;
    course: string;
    year: string;
  };
  projectRequirements: string;
  technology: string[];
  deadline: string;
  budget: string;
  contactInfo: {
    email: string;
    phone: string;
  };
  files?: FileList;
}

export default function ProjectFormPage() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<FormData>({
    studentDetails: {
      name: "",
      college: "",
      course: "",
      year: "",
    },
    projectRequirements: "",
    technology: [],
    deadline: "",
    budget: "",
    contactInfo: {
      email: "",
      phone: "",
    },
  });

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateStudentDetails = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      studentDetails: {
        ...prev.studentDetails,
        [field]: value,
      },
    }));
  };

  const updateContactInfo = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value,
      },
    }));
  };

  const handleTechnologyToggle = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technology: prev.technology.includes(tech)
        ? prev.technology.filter((t) => t !== tech)
        : [...prev.technology, tech],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      if (!user) {
        throw new Error("You must be logged in to submit a project");
      }

      // Validate form data
      if (!formData.studentDetails.name || !formData.projectRequirements || !formData.technology.length) {
        throw new Error("Please fill in all required fields");
      }

      // Save to user's projects subcollection
      const projectRef = await addDoc(collection(db, "users", user.uid, "projects"), {
        ...formData,
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp(),
        status: "pending",
        emailSent: false,
        adminResponse: null
      });

      // Send email notification
      try {
        await emailjs.send(
          'service_zue8h5s',
          'template_hrjo0xn',
          {
            to_email: user.email,
            to_name: user.displayName || user.email?.split('@')[0],
            project_id: projectRef.id,
            project_name: formData.studentDetails.name,
            requirements: formData.projectRequirements.substring(0, 100) + "...",
            message: "Your project has been submitted successfully!",
            subject: "Project Submission Confirmation"
          },
          'uDHwReKU7E6T0l0S2'
        );

        // Update project document to mark email as sent
        await updateDoc(doc(db, "users", user.uid, "projects", projectRef.id), {
          emailSent: true,
          lastUpdated: serverTimestamp()
        });
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError);
        // Continue even if email fails
      }

      setSuccess("Project submitted successfully! We'll contact you soon.");
      setFormData({
        studentDetails: {
          name: "",
          college: "",
          course: "",
          year: ""
        },
        projectRequirements: "",
        technology: [],
        deadline: "",
        budget: "",
        contactInfo: {
          email: "",
          phone: "",
        },
      });
    } catch (error: any) {
      console.error("Error submitting project:", error);
      setError(error.message || "Failed to submit project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 6));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderStep = () => {
    const inputClass = "w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500";
    const labelClass = "block text-sm font-medium text-gray-300 mb-2";

    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">Student Details</h2>
            </div>
            <div>
              <label htmlFor="name" className={labelClass}>Full Name</label>
              <input
                type="text"
                id="name"
                value={formData.studentDetails.name}
                onChange={(e) => updateStudentDetails("name", e.target.value)}
                className={inputClass}
                placeholder="Your full name"
                required
              />
            </div>
            <div>
              <label htmlFor="college" className={labelClass}>College Name</label>
              <input
                type="text"
                id="college"
                value={formData.studentDetails.college}
                onChange={(e) => updateStudentDetails("college", e.target.value)}
                className={inputClass}
                placeholder="Your college name"
                required
              />
            </div>
            <div>
              <label htmlFor="course" className={labelClass}>Course</label>
              <input
                type="text"
                id="course"
                value={formData.studentDetails.course}
                onChange={(e) => updateStudentDetails("course", e.target.value)}
                className={inputClass}
                placeholder="Your course name"
                required
              />
            </div>
            <div>
              <label htmlFor="year" className={labelClass}>Year</label>
              <select
                id="year"
                value={formData.studentDetails.year}
                onChange={(e) => updateStudentDetails("year", e.target.value)}
                className={inputClass}
                required
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">Project Requirements</h2>
            </div>
            <div>
              <label htmlFor="requirements" className={labelClass}>
                Describe your project requirements in detail
              </label>
              <textarea
                id="requirements"
                value={formData.projectRequirements}
                onChange={(e) => updateFormData("projectRequirements", e.target.value)}
                className={`${inputClass} h-48`}
                placeholder="Please provide detailed information about your project requirements..."
                required
              />
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-6">
              <Laptop className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">Technology Preferences</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {technologies.map((tech) => (
                <motion.button
                  key={tech}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTechnologyToggle(tech)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    formData.technology.includes(tech)
                      ? "bg-purple-500 text-white"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                  }`}
                >
                  {tech}
                </motion.button>
              ))}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">Project Timeline</h2>
            </div>
            <div>
              <label htmlFor="deadline" className={labelClass}>Project Deadline</label>
              <input
                type="date"
                id="deadline"
                value={formData.deadline}
                onChange={(e) => updateFormData("deadline", e.target.value)}
                className={inputClass}
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div>
              <label htmlFor="budget" className={labelClass}>
                Budget Range
              </label>
              <select
                id="budget"
                value={formData.budget}
                onChange={(e) => updateFormData("budget", e.target.value)}
                className={inputClass}
                required
              >
                <option value="">Select Budget Range</option>
                <option value="0-5000">₹0 - ₹5,000</option>
                <option value="5000-10000">₹5,000 - ₹10,000</option>
                <option value="10000-20000">₹10,000 - ₹20,000</option>
                <option value="20000+">₹20,000+</option>
              </select>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-6">
              <Phone className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">Contact Information</h2>
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>Email Address</label>
              <input
                type="email"
                id="email"
                value={formData.contactInfo.email}
                onChange={(e) => updateContactInfo("email", e.target.value)}
                className={inputClass}
                placeholder="Your email address"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>Phone Number</label>
              <input
                type="tel"
                id="phone"
                value={formData.contactInfo.phone}
                onChange={(e) => updateContactInfo("phone", e.target.value)}
                className={inputClass}
                placeholder="Your phone number"
                required
              />
            </div>
            <div>
              <label className={labelClass}>Project Documents</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:border-purple-500 transition-colors"
              >
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400">
                  Click to upload project documents (optional)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => updateFormData("files", e.target.files || null)}
                />
              </div>
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">Review Your Information</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-white font-medium mb-2">Student Details</h3>
                <p className="text-gray-300">Name: {formData.studentDetails.name}</p>
                <p className="text-gray-300">College: {formData.studentDetails.college}</p>
                <p className="text-gray-300">Course: {formData.studentDetails.course}</p>
                <p className="text-gray-300">Year: {formData.studentDetails.year}</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-white font-medium mb-2">Project Details</h3>
                <p className="text-gray-300">Requirements: {formData.projectRequirements}</p>
                <p className="text-gray-300">Technologies: {formData.technology.join(", ")}</p>
                <p className="text-gray-300">Deadline: {formData.deadline}</p>
                <p className="text-gray-300">Budget: {formData.budget}</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-white font-medium mb-2">Contact Information</h3>
                <p className="text-gray-300">Email: {formData.contactInfo.email}</p>
                <p className="text-gray-300">Phone: {formData.contactInfo.phone}</p>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Project Submitted Successfully!
          </h2>
          <p className="text-gray-300 mb-6">
            Thank you for submitting your project details. We will review your
            requirements and get back to you soon.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              setFormData({
                studentDetails: { name: "", college: "", course: "", year: "" },
                projectRequirements: "",
                technology: [],
                deadline: "",
                budget: "",
                contactInfo: { email: "", phone: "" },
              });
            }}
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            Submit another project
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-gray-400 mb-2">
            <span>Step {step} of 6</span>
            <span>{Math.round((step / 6) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full">
            <motion.div
              className="h-full bg-purple-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${(step / 6) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="px-4 py-2 text-white bg-gray-700/50 rounded-lg hover:bg-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {step === 6 ? (
              <form onSubmit={handleSubmit}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Project"
                  )}
                </button>
              </form>
            ) : (
              <button
                onClick={nextStep}
                className="px-4 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
