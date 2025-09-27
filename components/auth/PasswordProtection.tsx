"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/form-contact/button";
import { Input } from "@/components/form-contact/input";

interface PasswordProtectionProps {
  children: React.ReactNode;
  requiredPassword: string;
  title?: string;
  description?: string;
  sessionKey?: string;
}

export const PasswordProtection = ({ 
  children, 
  requiredPassword, 
  title = "Accès protégé",
  description = "Veuillez saisir le code d'accès à 4 chiffres",
  sessionKey = "authenticated"
}: PasswordProtectionProps) => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier si l'utilisateur est déjà authentifié
  useEffect(() => {
    const isAuth = sessionStorage.getItem(sessionKey) === "true";
    setIsAuthenticated(isAuth);
    setIsLoading(false);
  }, [sessionKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === requiredPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem(sessionKey, "true");
      setError("");
    } else {
      setError("Code incorrect");
      setPassword("");
      // Retirer l'erreur après 3 secondes
      setTimeout(() => setError(""), 3000);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4); // Seulement les chiffres, max 4
    setPassword(value);
    if (error) setError("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-white/10 backdrop-blur-xl border border-foreground/20 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Lock className="w-8 h-8 text-blue-400" />
            </motion.div>
            <h1 className="text-2xl font-bold text-foreground mb-2">{title}</h1>
            <p className="text-foreground/70">{description}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                placeholder="••••"
                className="bg-white/10 border-foreground/30 text-foreground text-center text-2xl tracking-widest placeholder:text-foreground/50 focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/70 pr-12"
                maxLength={4}
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/60 hover:text-foreground/80 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-4"
              >
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={password.length !== 4}
              className="w-full bg-blue-500/90 hover:bg-blue-600/90 text-white border border-blue-400/50 shadow-lg backdrop-blur-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Accéder
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-foreground/50 text-xs">
              Session valide jusqu&apos;à la fermeture du navigateur
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
