"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { ProtectedRoute } from "@/components/protected-route";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import {
  BarChart,
  Activity,
  Users,
  FileCode,
  Bell,
  Settings,
  Sparkles,
  Calendar,
  Clock,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function fetchUserName() {
      if (user?.uid) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        }
      }
    }
    fetchUserName();
  }, [user]);

  const stats = [
    {
      name: "Active Projects",
      value: "3",
      change: "+2",
      changeType: "increase",
      icon: FileCode,
    },
    {
      name: "Project Views",
      value: "124",
      change: "+41",
      changeType: "increase",
      icon: Activity,
    },
    {
      name: "Team Members",
      value: "5",
      change: "+1",
      changeType: "increase",
      icon: Users,
    },
    {
      name: "Completion Rate",
      value: "92%",
      change: "+12%",
      changeType: "increase",
      icon: BarChart,
    },
  ];

  const recentProjects = [
    {
      name: "E-commerce Platform",
      status: "In Progress",
      progress: 75,
      dueDate: "Mar 15, 2024",
      description: "Building a modern e-commerce platform with Next.js and Stripe integration",
      team: ["John D.", "Sarah M.", "Mike R."],
    },
    {
      name: "AI Chat Application",
      status: "Planning",
      progress: 25,
      dueDate: "Apr 1, 2024",
      description: "Developing an AI-powered chat application using OpenAI's GPT-4",
      team: ["Emma L.", "Chris P."],
    },
    {
      name: "Mobile Banking App",
      status: "Completed",
      progress: 100,
      dueDate: "Feb 28, 2024",
      description: "A secure mobile banking application with real-time transactions",
      team: ["Alex K.", "Lisa T.", "Tom B."],
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900 p-[10px]">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            {...fadeInUp}
            className="mb-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 sm:p-8"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome back, {userName || user?.displayName || "User"}! 👋
                </h1>
                <p className="text-gray-400">
                  Here's what's happening with your projects today.
                </p>
              </div>
              <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-purple-500/10 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors">
                <Sparkles className="h-4 w-4 mr-2" />
                New Project
              </button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-750 transition-colors group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gray-700 p-3 rounded-lg group-hover:bg-gray-600 transition-colors">
                    <stat.icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <span
                    className={`flex items-center text-sm ${
                      stat.changeType === "increase"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {stat.changeType === "increase" ? (
                      <ArrowUp className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 mr-1" />
                    )}
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-400 text-sm">{stat.name}</p>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Projects List */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 bg-gray-800 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Recent Projects</h2>
                <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center">
                  View all
                  <ArrowUp className="h-4 w-4 ml-1 rotate-90" />
                </button>
              </div>
              <div className="space-y-4">
                {recentProjects.map((project, index) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-gray-700/50 rounded-xl p-4 hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-white text-lg mb-1">
                          {project.name}
                        </h3>
                        <p className="text-gray-400 text-sm mb-2">
                          {project.description}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${
                          project.status === "Completed"
                            ? "bg-green-400/10 text-green-400"
                            : project.status === "In Progress"
                            ? "bg-blue-400/10 text-blue-400"
                            : "bg-yellow-400/10 text-yellow-400"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`h-2 rounded-full ${
                              project.status === "Completed"
                                ? "bg-green-400"
                                : "bg-purple-400"
                            }`}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                        <div className="flex items-center text-gray-400 mb-2 sm:mb-0">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Due: {project.dueDate}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="flex -space-x-2">
                            {project.team.map((member, i) => (
                              <div
                                key={i}
                                className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs text-white border-2 border-gray-800"
                              >
                                {member[0]}
                              </div>
                            ))}
                          </div>
                          <span className="text-gray-400 ml-2">
                            {project.team.length} members
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              {/* Upcoming Deadlines */}
              <div className="bg-gray-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">
                    Upcoming Deadlines
                  </h2>
                  <Calendar className="h-5 w-5 text-purple-400" />
                </div>
                <div className="space-y-4">
                  {recentProjects
                    .filter((p) => p.status !== "Completed")
                    .map((project, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-purple-400" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {project.name}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Due: {project.dueDate}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-800 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      name: "New Project",
                      icon: FileCode,
                      color: "text-purple-400",
                      bgColor: "bg-purple-500/10",
                    },
                    {
                      name: "Add Member",
                      icon: Users,
                      color: "text-blue-400",
                      bgColor: "bg-blue-500/10",
                    },
                    {
                      name: "Settings",
                      icon: Settings,
                      color: "text-green-400",
                      bgColor: "bg-green-500/10",
                    },
                    {
                      name: "Analytics",
                      icon: Activity,
                      color: "text-red-400",
                      bgColor: "bg-red-500/10",
                    },
                  ].map((action, index) => (
                    <motion.button
                      key={action.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 ${action.bgColor} rounded-xl hover:bg-opacity-80 transition-colors`}
                    >
                      <action.icon
                        className={`h-6 w-6 ${action.color} mx-auto mb-2`}
                      />
                      <span className="text-sm text-white block">
                        {action.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
