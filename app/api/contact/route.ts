import { NextRequest, NextResponse } from 'next/server';
import { createTransporter, createGmailTransporter, createEmailTemplate, createConfirmationTemplate } from '@/lib/email';
import { validateContactForm } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    // Vérification des variables d'environnement
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('Variables d\'environnement manquantes:', {
        EMAIL_USER: !!process.env.EMAIL_USER,
        EMAIL_PASSWORD: !!process.env.EMAIL_PASSWORD
      });
      return NextResponse.json(
        { error: 'Configuration email manquante. Veuillez configurer les variables d\'environnement.' },
        { status: 500 }
      );
    }

    // Récupérer les données du formulaire
    const formData = await request.json();
    
    // Log pour déboguer (à retirer en production)
    console.log('Données reçues:', formData);
    
    // Validation avec la fonction utilitaire
    const validation = validateContactForm(formData);
    
    if (!validation.isValid) {
      console.log('Erreurs de validation:', validation.errors);
      return NextResponse.json(
        { error: validation.errors.join(', ') },
        { status: 400 }
      );
    }

    // Essayer d'abord la configuration standard, puis l'alternative
    let transporter = createTransporter();
    
    // Email pour vous (notification de nouvelle demande)
    const adminEmailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER, // Votre email de réception
      subject: `🚀 Nouvelle demande: ${formData.subject}`,
      html: createEmailTemplate(formData),
      replyTo: formData.email, // Permet de répondre directement au client
    };

    // Email de confirmation pour le client
    const confirmationEmailOptions = {
      from: process.env.EMAIL_USER,
      to: formData.email,
      subject: '✅ Votre message a bien été reçu',
      html: createConfirmationTemplate(formData.name),
    };

    try {
      // Envoyer les deux emails
      await Promise.all([
        transporter.sendMail(adminEmailOptions),
        transporter.sendMail(confirmationEmailOptions)
      ]);
    } catch (emailError) {
      console.log('Première tentative échouée, essai avec configuration alternative...');
      
      // Si erreur de certificat, essayer la configuration alternative
      const errorMessage = emailError instanceof Error ? emailError.message : ''
      if (errorMessage.includes('certificate') || errorMessage.includes('SSL')) {
        transporter = createGmailTransporter();
        
        await Promise.all([
          transporter.sendMail(adminEmailOptions),
          transporter.sendMail(confirmationEmailOptions)
        ]);
      } else {
        throw emailError;
      }
    }

    // Réponse de succès
    return NextResponse.json(
      { 
        message: 'Emails envoyés avec succès',
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors de l\'envoi d\'email:', error);
    
    // Diagnostic des erreurs courantes
    let errorMessage = 'Erreur lors de l\'envoi de l\'email';
    
    if (error instanceof Error) {
      if (error.message.includes('Invalid login')) {
        errorMessage = 'Configuration email invalide. Vérifiez vos identifiants Gmail.';
      } else if (error.message.includes('getaddrinfo ENOTFOUND')) {
        errorMessage = 'Problème de connexion réseau. Vérifiez votre connexion internet.';
      } else if (error.message.includes('Missing credentials')) {
        errorMessage = 'Variables d\'environnement manquantes. Configurez EMAIL_USER et EMAIL_PASSWORD.';
      } else {
        errorMessage = `Erreur: ${error.message}`;
      }
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error?.toString() : undefined
      },
      { status: 500 }
    );
  }
}
