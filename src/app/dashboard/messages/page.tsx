"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  limit,
  doc,
  getDoc,
} from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Image as ImageIcon, Paperclip, Smile } from "lucide-react";

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: any;
  type: 'text' | 'image';
}

export default function MessagesPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [userName, setUserName] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  const autoResize = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  };

  // Fetch user name
  useEffect(() => {
    async function fetchUserName() {
      if (user?.uid) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name || user.displayName || "User");
        }
      }
    }
    fetchUserName();
  }, [user]);

  // Subscribe to messages
  useEffect(() => {
    if (!user?.uid) return;

    try {
      const messagesRef = collection(db, "users", user.uid, "messages");
      const q = query(
        messagesRef,
        orderBy("timestamp", "asc"),
        limit(100)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messagesList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Message[];
        setMessages(messagesList);
        setIsLoading(false);
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      }, (error) => {
        console.error("Error fetching messages:", error);
        setIsLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Error setting up messages listener:", error);
      setIsLoading(false);
    }
  }, [user]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user?.uid || isSending) return;

    setIsSending(true);
    try {
      const messageData = {
        text: newMessage.trim(),
        senderId: user.uid,
        senderName: userName,
        timestamp: serverTimestamp(),
        type: 'text'
      };

      await addDoc(collection(db, "users", user.uid, "messages"), messageData);
      setNewMessage("");
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 md:left-64 pl-0 mb-[55px] md:mb-0">
      <div className="h-full max-w-4xl mx-auto bg-gray-800/95 backdrop-blur-sm overflow-hidden border-x border-gray-700/50">
        <div className="flex flex-col h-full">
          {/* Chat Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-4 border-b border-gray-700 bg-gray-800/95 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Messages</h2>
                <p className="text-sm text-gray-400">Share your thoughts and ideas</p>
              </div>
              <div className="text-sm text-gray-400 bg-gray-700/50 px-3 py-1 rounded-full">
                {messages.length} messages
              </div>
            </div>
          </motion.div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-8 h-8 text-purple-500" />
                </motion.div>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${
                      message.senderId === user.uid ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`group max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-3 ${
                        message.senderId === user.uid
                          ? "bg-purple-500 text-white ml-8 sm:ml-12"
                          : "bg-gray-700 text-gray-100 mr-8 sm:mr-12"
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-purple-600/20 flex items-center justify-center">
                          <span className="text-xs font-medium">
                            {message.senderName[0].toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm font-medium">
                          {message.senderName}
                        </span>
                        <span className="text-xs opacity-50">
                          {message.timestamp?.toDate().toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <p className="text-[15px] leading-relaxed break-words whitespace-pre-wrap">
                        {message.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="border-t border-gray-700 bg-gray-800/95 backdrop-blur-sm p-4"
          >
            <form onSubmit={sendMessage} className="flex items-end gap-2">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    autoResize();
                  }}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  rows={1}
                  className="w-full bg-gray-700/50 text-white rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 resize-none max-h-32"
                />
                <div className="absolute right-2 bottom-2 flex items-center gap-1">
                  <button
                    type="button"
                    className="p-1.5 text-gray-400 hover:text-purple-400 transition-colors rounded-lg hover:bg-gray-700/50"
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 text-gray-400 hover:text-purple-400 transition-colors rounded-lg hover:bg-gray-700/50"
                  >
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 text-gray-400 hover:text-purple-400 transition-colors rounded-lg hover:bg-gray-700/50"
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={!newMessage.trim() || isSending}
                className="p-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
