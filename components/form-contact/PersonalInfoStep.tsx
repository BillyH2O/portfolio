"use client";

import { motion } from "framer-motion";
import { Input } from "./input";
import { Label } from "@/components/ui/label";
import { ContactFormData } from "@/hooks/useContactForm";
import { isValidEmail } from "@/lib/validation";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";

interface PersonalInfoStepProps {
  formData: ContactFormData;
  updateFormData: (field: keyof ContactFormData, value: string) => void;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export const PersonalInfoStep = ({ formData, updateFormData }: PersonalInfoStepProps) => {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-foreground/90 dark:text-foreground/80 transition-colors duration-300">Vos informations</CardTitle>
        <CardDescription className="text-foreground/70 dark:text-foreground/60 transition-colors duration-300">
          Commençons par vos coordonnées
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div variants={fadeInUp} className="space-y-2">
          <Label htmlFor="name" className="text-foreground/90 dark:text-foreground/80 transition-colors duration-300">
            Nom / Prénom <span className="text-red-400">*</span>
          </Label>
          <Input
            id="name"
            placeholder="Jean Dupont"
            value={formData.name}
            onChange={(e) => updateFormData("name", e.target.value)}
            className="bg-white/10 dark:bg-white/5 border border-foreground/30 dark:border-foreground/20 text-foreground placeholder:text-foreground/60 backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/70 focus:bg-white/15 dark:focus:bg-white/10"
            required
          />
        </motion.div>
        
        <motion.div variants={fadeInUp} className="space-y-2">
          <Label htmlFor="email" className="text-foreground/90 dark:text-foreground/80 transition-colors duration-300">
            Email <span className="text-red-400">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="jean@exemple.com"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            className={`bg-white/80 border-slate-200 text-slate-800 placeholder:text-slate-500 transition-all duration-300 focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400 focus:bg-white ${
              formData.email && !isValidEmail(formData.email)
                ? 'border-red-300 focus:border-red-400 focus:ring-red-400/30'
                : ''
            }`}
            required
          />
          {formData.email && !isValidEmail(formData.email) && (
            <p className="text-red-400 text-sm">Format d&apos;email invalide</p>
          )}
        </motion.div>
        
        <motion.div variants={fadeInUp} className="space-y-2">
          <Label htmlFor="phone" className="text-foreground/90 dark:text-foreground/80 transition-colors duration-300">
            Téléphone <span className="text-foreground/60 dark:text-foreground/50">(optionnel)</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="06 12 34 56 78"
            value={formData.phone}
            onChange={(e) => updateFormData("phone", e.target.value)}
            className="bg-white/10 dark:bg-white/5 border border-foreground/30 dark:border-foreground/20 text-foreground placeholder:text-foreground/60 backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/70 focus:bg-white/15 dark:focus:bg-white/10"
          />
        </motion.div>
        
        <motion.div variants={fadeInUp} className="space-y-2">
          <Label htmlFor="company" className="text-foreground/90 dark:text-foreground/80 transition-colors duration-300">
            Entreprise / Organisation <span className="text-foreground/60 dark:text-foreground/50">(optionnel)</span>
          </Label>
          <Input
            id="company"
            placeholder="Mon Entreprise"
            value={formData.company}
            onChange={(e) => updateFormData("company", e.target.value)}
            className="bg-white/10 dark:bg-white/5 border border-foreground/30 dark:border-foreground/20 text-foreground placeholder:text-foreground/60 backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/70 focus:bg-white/15 dark:focus:bg-white/10"
          />
        </motion.div>
      </CardContent>
    </>
  );
};
