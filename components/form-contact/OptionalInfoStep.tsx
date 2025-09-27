"use client";

import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { ContactFormData } from "@/hooks/useContactForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";

interface OptionalInfoStepProps {
  formData: ContactFormData;
  updateFormData: (field: keyof ContactFormData, value: string) => void;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export const OptionalInfoStep = ({ formData, updateFormData }: OptionalInfoStepProps) => {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-foreground/90 dark:text-foreground/80 transition-colors duration-300">Informations complémentaires</CardTitle>
        <CardDescription className="text-foreground/70 dark:text-foreground/60 transition-colors duration-300">
          Ces informations nous aideront à mieux vous accompagner <span className="text-foreground/60 dark:text-foreground/50">(optionnel)</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div variants={fadeInUp} className="space-y-2">
          <Label htmlFor="projectType" className="text-foreground/90 dark:text-foreground/80 transition-colors duration-300">
            Type de projet
          </Label>
          <Select
            value={formData.projectType}
            onValueChange={(value) => updateFormData("projectType", value)}
          >
            <SelectTrigger
              id="projectType"
              className="bg-white/10 dark:bg-white/5 border border-foreground/30 dark:border-foreground/20 text-foreground backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/70 focus:bg-white/15 dark:focus:bg-white/10"
            >
              <SelectValue placeholder="Sélectionner un type de projet" className="text-foreground/60" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web-app">Application Web</SelectItem>
              <SelectItem value="ai-ml">IA/ML</SelectItem>
              <SelectItem value="website">Site vitrine</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
        
        <motion.div variants={fadeInUp} className="space-y-2">
          <Label htmlFor="budget" className="text-foreground/90 dark:text-foreground/80 transition-colors duration-300">
            Budget estimatif
          </Label>
          <Select
            value={formData.budget}
            onValueChange={(value) => updateFormData("budget", value)}
          >
            <SelectTrigger
              id="budget"
              className="bg-white/10 dark:bg-white/5 border border-foreground/30 dark:border-foreground/20 text-foreground backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/70 focus:bg-white/15 dark:focus:bg-white/10"
            >
              <SelectValue placeholder="Sélectionner une fourchette" className="text-foreground/60" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under-1000">Moins de 1 000€</SelectItem>
              <SelectItem value="1000-5000">1 000€ - 5 000€</SelectItem>
              <SelectItem value="over-5000">Plus de 5 000€</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
        
        <motion.div variants={fadeInUp} className="space-y-2">
          <Label htmlFor="timeline" className="text-foreground/90 dark:text-foreground/80 transition-colors duration-300">
            Délais souhaités
          </Label>
          <Select
            value={formData.timeline}
            onValueChange={(value) => updateFormData("timeline", value)}
          >
            <SelectTrigger
              id="timeline"
              className="bg-white/10 dark:bg-white/5 border border-foreground/30 dark:border-foreground/20 text-foreground backdrop-blur-sm transition-all duration-300 focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/70 focus:bg-white/15 dark:focus:bg-white/10"
            >
              <SelectValue placeholder="Sélectionner un délai" className="text-foreground/60" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immédiat</SelectItem>
              <SelectItem value="1-month">1 mois</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
      </CardContent>
    </>
  );
};

