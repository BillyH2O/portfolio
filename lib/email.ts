import nodemailer from 'nodemailer';

// Configuration pour Gmail (recommandé pour débuter)
export const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // votre email Gmail
      pass: process.env.EMAIL_PASSWORD, // mot de passe d'application Gmail
    },
    // Résoudre les problèmes de certificat SSL
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Configuration Gmail alternative (si problème de certificat)
export const createGmailTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
      ciphers: 'SSLv3'
    }
  });
};

// Alternative : Configuration SMTP personnalisée (pour un email professionnel)
export const createCustomTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST, // ex: mail.votre-domaine.com
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true pour 465, false pour 587
    auth: {
      user: process.env.SMTP_USER, // votre email professionnel
      pass: process.env.SMTP_PASSWORD, // mot de passe
    },
    // Résoudre les problèmes de certificat SSL
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Types pour les données de formulaire de contact
interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
  projectType?: string
  budget?: string
  timeline?: string
  phone?: string
  subject?: string
}

// Template d'email professionnel
export const createEmailTemplate = (formData: ContactFormData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
            .field { margin: 15px 0; }
            .label { font-weight: bold; color: #555; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 4px solid #667eea; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>🚀 Nouvelle demande de contact</h2>
                <p>Vous avez reçu une nouvelle demande via votre site web</p>
            </div>
            <div class="content">
                <div class="field">
                    <div class="label">👤 Nom / Prénom :</div>
                    <div class="value">${formData.name}</div>
                </div>
                
                <div class="field">
                    <div class="label">📧 Email :</div>
                    <div class="value"><a href="mailto:${formData.email}">${formData.email}</a></div>
                </div>
                
                ${formData.phone ? `
                <div class="field">
                    <div class="label">📱 Téléphone :</div>
                    <div class="value"><a href="tel:${formData.phone}">${formData.phone}</a></div>
                </div>
                ` : ''}
                
                ${formData.company ? `
                <div class="field">
                    <div class="label">🏢 Entreprise :</div>
                    <div class="value">${formData.company}</div>
                </div>
                ` : ''}
                
                <div class="field">
                    <div class="label">📋 Sujet :</div>
                    <div class="value">${formData.subject}</div>
                </div>
                
                <div class="field">
                    <div class="label">💬 Message :</div>
                    <div class="value">${formData.message.replace(/\n/g, '<br>')}</div>
                </div>
                
                ${formData.projectType ? `
                <div class="field">
                    <div class="label">🔧 Type de projet :</div>
                    <div class="value">${formData.projectType}</div>
                </div>
                ` : ''}
                
                ${formData.budget ? `
                <div class="field">
                    <div class="label">💰 Budget :</div>
                    <div class="value">${formData.budget}</div>
                </div>
                ` : ''}
                
                ${formData.timeline ? `
                <div class="field">
                    <div class="label">⏰ Délais :</div>
                    <div class="value">${formData.timeline}</div>
                </div>
                ` : ''}
            </div>
            <div class="footer">
                <p>Email envoyé automatiquement depuis votre site web</p>
                <p>Répondez directement à ${formData.email} pour contacter le client</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Email de confirmation pour le client
export const createConfirmationTemplate = (name: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .highlight { color: #667eea; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>✅ Message bien reçu !</h2>
            </div>
            <div class="content">
                <p>Bonjour <span class="highlight">${name}</span>,</p>
                
                <p>Merci pour votre message ! J'ai bien reçu votre demande et je vous réponds sous <span class="highlight">24h maximum</span>.</p>
                
                <p>En attendant, n'hésitez pas à :</p>
                <ul>
                    <li>Consulter mes <a href="#" style="color: #667eea;">projets récents</a></li>
                    <li>Me suivre sur <a href="#" style="color: #667eea;">LinkedIn</a></li>
                    <li>Voir mes <a href="#" style="color: #667eea;">témoignages clients</a></li>
                </ul>
                
                <p>À très bientôt,<br>
                <strong>Votre Nom</strong></p>
            </div>
            <div class="footer">
                <p>Cet email est envoyé automatiquement, merci de ne pas y répondre.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};
