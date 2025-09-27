"use client";

import { ContactForm } from "@/components/form-contact/ContactForm";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/navbar";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-500 w-full dark:bg-[url('/bg/dark-background.png')] bg-[url('/bg/light-background.png')] bg-cover bg-center relative">      
     <Header />
      <div className="container mx-auto px-4 py-40">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 transition-colors duration-300">
            Contactez-nous
          </h1>
          <p className="text-xl text-foreground md:w-[500px] w-[90%] text-center mx-auto transition-colors duration-300">
            Vous avez un projet en tête ? Parlons-en ensemble et donnons vie à vos idées.
          </p>
        </div>
        
        <ContactForm />
                        </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
