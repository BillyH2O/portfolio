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
    <div className="w-full max-w-2xl mx-auto py-8 px-4 relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-20"
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-slate-900/40" />
      {/* Progress indicator */}
      <motion.div
        className="mb-8 relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Glass background for progress */}
        <div className="absolute inset-0 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-foreground/20 dark:border-foreground/10 shadow-xl" />
        <div className="relative p-6">
          <div className="flex justify-between mb-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center flex-1"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className={cn(
                  "w-8 h-8 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center text-sm font-medium backdrop-blur-sm",
                  index < currentStep
                    ? "bg-green-500/90 text-foreground shadow-lg shadow-green-500/30 border border-green-400/50"
                    : index === currentStep
                      ? "bg-blue-500/90 text-foreground ring-4 ring-blue-400/30 shadow-lg shadow-blue-500/30 border border-blue-400/50"
                      : "bg-white/20 text-foreground border border-foreground/30 dark:bg-white/10 dark:border-foreground/20",
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
                  "text-xs mt-2 text-center transition-colors duration-300 font-medium",
                  index === currentStep
                    ? "text-blue-400 dark:text-blue-300"
                    : index < currentStep
                      ? "text-green-400 dark:text-green-300"
                      : "text-foreground/70 dark:text-foreground/60",
                )}
              >
                {step.title}
              </motion.span>
            </motion.div>
          ))}
        </div>
          <div className="w-full bg-white/20 dark:bg-white/10 h-2 rounded-full overflow-hidden backdrop-blur-sm border border-foreground/30 dark:border-foreground/20">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 shadow-lg shadow-blue-500/25"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-white/10 dark:bg-white/5 border border-foreground/20 dark:border-foreground/10 shadow-2xl rounded-3xl overflow-hidden backdrop-blur-xl transition-all duration-300 hover:bg-white/15 dark:hover:bg-white/8">
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

            <CardFooter className="flex justify-between pt-6 pb-6 bg-white/5 dark:bg-white/3 backdrop-blur-sm border-t border-foreground/20 dark:border-foreground/10 transition-all duration-300">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 transition-all duration-300 rounded-xl bg-white/20 dark:bg-white/10 border border-foreground/30 dark:border-foreground/20 text-foreground backdrop-blur-sm hover:bg-white/30 dark:hover:bg-white/15 hover:border-foreground/40 dark:hover:border-foreground/30 disabled:opacity-50 shadow-lg"
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
                    "flex items-center gap-2 transition-all duration-300 rounded-xl text-white shadow-lg backdrop-blur-sm border",
                    currentStep === totalSteps - 1
                      ? "bg-green-500/90 hover:bg-green-600/90 shadow-green-500/30 border-green-400/50"
                      : "bg-blue-500/90 hover:bg-blue-600/90 shadow-blue-500/30 border-blue-400/50",
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
        className="mt-6 text-center text-sm text-foreground/80 dark:text-foreground/70 transition-colors duration-300 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-foreground/20 dark:border-foreground/10 py-3 px-6 shadow-lg"
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
