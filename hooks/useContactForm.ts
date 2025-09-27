import { useState } from "react";
import { isValidEmail } from "@/lib/validation";

export interface ContactFormData {
  // Champs indispensables
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  
  // Champs optionnels
  projectType: string;
  budget: string;
  timeline: string;
  company: string;
}

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  projectType: "",
  budget: "",
  timeline: "",
  company: "",
};

export const useContactForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);

  const updateFormData = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Appel API pour envoyer l'email
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erreur lors de l\'envoi');
      }

      // Reset form en cas de succès
      setFormData(initialFormData);
      setCurrentStep(0);
      
      return { success: true, message: result.message };
    } catch (error) {
      console.error("Form submission error:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    } finally {
      setIsSubmitting(false);
    }
  };


  // Validation des étapes
  const isStepValid = () => {
    switch (currentStep) {
      case 0: // Informations personnelles
        return formData.name.trim() !== "" && 
               formData.email.trim() !== "" && 
               isValidEmail(formData.email);
      case 1: // Détails du projet
        return formData.subject.trim() !== "" && 
               formData.message.trim() !== "";
      case 2: // Informations optionnelles
        return true; // Toujours valide car optionnel
      default:
        return true;
    }
  };

  return {
    currentStep,
    formData,
    isSubmitting,
    updateFormData,
    nextStep,
    prevStep,
    handleSubmit,
    isStepValid,
    totalSteps: 3,
  };
};
