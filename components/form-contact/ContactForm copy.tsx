"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Send, Loader2, Check } from "lucide-react";
import { Button } from "./button";
import { Card, CardFooter } from "./card";
import { useContactForm } from "@/hooks/useContactForm";
import { PersonalInfoStep } from "./PersonalInfoStep";
import { ProjectDetailsStep } from "./ProjectDetailsStep";
import { OptionalInfoStep } from "./OptionalInfoStep";
import { ContactInfo } from "./ContactInfo";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";

const steps = [
  { id: "personal", title: "Informations" },
  { id: "project", title: "Projet" },
  { id: "optional", title: "Détails" },
];

const contentVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
};

export const ContactForm = () => {
  const {
    currentStep,
    formData,
    isSubmitting,
    updateFormData,
    nextStep,
    prevStep,
    handleSubmit,
    isStepValid,
    totalSteps,
  } = useContactForm();

  const onSubmit = async () => {
    const result = await handleSubmit();
    if (result.success) {
      toast.success("✅ Votre message a été envoyé avec succès !");
    } else {
      toast.error(`❌ ${result.error || "Une erreur est survenue. Veuillez réessayer."}`);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 1:
        return (
          <ProjectDetailsStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      case 2:
        return (
          <OptionalInfoStep
            formData={formData}
            updateFormData={updateFormData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-4">
      {/* Progress indicator */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between mb-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center flex-1"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className={cn(
                  "w-8 h-8 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center text-sm font-medium",
                  index < currentStep
                    ? "bg-green-500 text-foreground shadow-lg shadow-green-500/30"
                    : index === currentStep
                      ? "bg-blue-500 text-foreground ring-4 ring-blue-400/30 shadow-lg shadow-blue-500/30"
                      : "bg-slate-200 text-slate-500 border border-slate-300",
                )}
                onClick={() => {
                  // Permettre de revenir aux étapes précédentes
                  if (index <= currentStep) {
                    // setCurrentStep(index); // Vous pouvez activer ceci si vous voulez permettre la navigation
                  }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {index < currentStep ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </motion.div>
              <motion.span
                className={cn(
                  "text-xs mt-2 text-center transition-colors duration-300",
                  index === currentStep
                    ? "text-blue-600 font-medium"
                    : index < currentStep
                      ? "text-green-600 font-medium"
                      : "text-slate-500",
                )}
              >
                {step.title}
              </motion.span>
            </motion.div>
          ))}
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 shadow-sm"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-card/90 border shadow-xl rounded-3xl overflow-hidden backdrop-blur-sm transition-colors duration-300">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            <CardFooter className="flex justify-between pt-6 pb-6 bg-muted/50 transition-colors duration-300">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 transition-all duration-300 rounded-xl bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 hover:border-slate-400 dark:hover:border-slate-500 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Précédent
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="button"
                  onClick={currentStep === totalSteps - 1 ? onSubmit : nextStep}
                  disabled={!isStepValid() || isSubmitting}
                  className={cn(
                    "flex items-center gap-2 transition-all duration-300 rounded-xl text-white shadow-lg",
                    currentStep === totalSteps - 1
                      ? "bg-green-500 hover:bg-green-600 shadow-green-500/30"
                      : "bg-blue-500 hover:bg-blue-600 shadow-blue-500/30",
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : currentStep === totalSteps - 1 ? (
                    <>
                      <Send className="h-4 w-4" />
                      Envoyer ma demande
                    </>
                  ) : (
                    <>
                      Suivant
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </div>
        </Card>
      </motion.div>

      {/* Step indicator */}
      <motion.div
        className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Étape {currentStep + 1} sur {totalSteps} : {steps[currentStep].title}
      </motion.div>

      {/* Contact info */}
      <ContactInfo />
    </div>
  );
};
