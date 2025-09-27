"use client";

import { motion } from "framer-motion";
import { Mail, Clock } from "lucide-react";

export const ContactInfo = () => {
  return (
    <motion.div
      className="mt-8 p-6 bg-white/10 dark:bg-white/5 border border-foreground/20 dark:border-foreground/10 rounded-2xl backdrop-blur-xl shadow-xl transition-all duration-300 hover:bg-white/15 dark:hover:bg-white/8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-foreground/90 dark:text-foreground/80">
          <Mail className="h-5 w-5 text-blue-400" />
          <span className="font-medium">Contact direct :</span>
          <a 
            href="mailto:elbiyadi.bilal@gmail.com" 
            className="text-blue-300 hover:text-blue-200 underline transition-colors"
          >
            elbiyadi.bilal@gmail.com
          </a>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-foreground/80 dark:text-foreground/70">
          <Clock className="h-4 w-4 text-green-400" />
          <span className="text-sm">Je vous réponds sous 24h</span>
        </div>
      </div>
    </motion.div>
  );
};

