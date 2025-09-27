"use client";

import { motion } from "framer-motion";
import { Input } from "./input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./textarea";
import { ContactFormData } from "@/hooks/useContactForm";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";

interface ProjectDetailsStepProps {
  formData: ContactFormData;
  updateFormData: (field: keyof ContactFormData, value: string) => void;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export const ProjectDetailsStep = ({ formData, updateFormData }: ProjectDetailsStepProps) => {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-foreground/90 dark:text-foreground/80 transition-colors duration-300">Votre projet</CardTitle>
        <CardDescription className="text-foreground/70 dark:text-foreground/60 transition-colors duration-300">
          Parlez-nous de votre besoin
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div variants={fadeInUp} className="space-y-2">
          <Label htmlFor="subject" className="text-foreground/90 dark:text-foreground/80 transition-colors duration-300">
            Sujet <span className="text-red-400">*</span>
          </Label>
          <Input
            id="subject"
            placeholder="ex. Développement web, Mission IA, Autre"
            value={formData.subject}
            onChange={(e) => updateFormData("subject", e.target.value)}
            className="bg-white/10 dark:bg-white/5 border border-foreground/30 dark:border-foreground/20 text-foreground placeholder:text-foreground/60 backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/70 focus:bg-white/15 dark:focus:bg-white/10"
            required
          />
        </motion.div>
        
        <motion.div variants={fadeInUp} className="space-y-2">
          <Label htmlFor="message" className="text-foreground/90 dark:text-foreground/80 transition-colors duration-300">
            Message <span className="text-red-400">*</span>
          </Label>
          <Textarea
            id="message"
            placeholder="Décrivez votre projet, vos besoins, vos attentes..."
            value={formData.message}
            onChange={(e) => updateFormData("message", e.target.value)}
            className="min-h-[120px] bg-white/10 dark:bg-white/5 border border-foreground/30 dark:border-foreground/20 text-foreground placeholder:text-foreground/60 backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/70 focus:bg-white/15 dark:focus:bg-white/10"
            required
          />
        </motion.div>
      </CardContent>
    </>
  );
};

