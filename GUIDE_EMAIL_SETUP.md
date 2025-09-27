# 📧 Guide de Configuration Email

## 🚀 Configuration rapide avec Gmail (Recommandé)

### 1. Préparer votre compte Gmail

1. **Connectez-vous à votre Gmail**
2. **Activez l'authentification à 2 facteurs** :
   - Allez dans votre compte Google → Sécurité
   - Activez la "Validation en deux étapes"

3. **Créez un mot de passe d'application** :
   - Dans Sécurité → Mots de passe des applications
   - Sélectionnez "Autre" et nommez-le "Portfolio Contact Form"
   - **Copiez le mot de passe généré** (16 caractères)

### 2. Configurer les variables d'environnement

1. **Créez un fichier `.env.local`** à la racine de votre projet :
```bash
# Configuration Gmail
EMAIL_USER=votre.email@gmail.com
EMAIL_PASSWORD=abcd_efgh_ijkl_mnop  # Mot de passe d'application (16 caractères)
ADMIN_EMAIL=votre.email@gmail.com   # Email où vous recevrez les messages
```

2. **Remplacez les valeurs** :
   - `EMAIL_USER` : Votre adresse Gmail
   - `EMAIL_PASSWORD` : Le mot de passe d'application généré
   - `ADMIN_EMAIL` : L'email où recevoir les messages (peut être le même)

### 3. Tester la configuration

```bash
npm run dev
```

Allez sur `/contact` et testez le formulaire !

---

## 🏢 Configuration avec un email professionnel (Avancé)

### 1. Récupérer les paramètres SMTP

Contactez votre hébergeur ou consultez leur documentation pour obtenir :
- **Serveur SMTP** (ex: `mail.votre-domaine.com`)
- **Port** (généralement 587 ou 465)
- **Sécurité** (TLS/SSL)
- **Identifiants** de votre email professionnel

### 2. Configurer les variables d'environnement

```bash
# Configuration SMTP personnalisée
SMTP_HOST=mail.votre-domaine.com
SMTP_PORT=587
SMTP_SECURE=false  # true pour port 465 (SSL), false pour 587 (TLS)
SMTP_USER=contact@votre-domaine.com
SMTP_PASSWORD=votre_mot_de_passe_email
ADMIN_EMAIL=votre@email.com
```

### 3. Modifier le transporteur

Dans `lib/email.ts`, remplacez `createTransporter()` par `createCustomTransporter()` :

```typescript
// Dans app/api/contact/route.ts
const transporter = createCustomTransporter(); // Au lieu de createTransporter()
```

---

## 🛠️ Personnalisation

### Modifier l'email de réception

Éditez le template dans `lib/email.ts` :

```typescript
export const createEmailTemplate = (formData: any) => {
  return `
    <!-- Votre HTML personnalisé -->
    <h1>Nouveau message de ${formData.name}</h1>
    <!-- ... -->
  `;
};
```

### Ajouter des champs au template

1. **Ajoutez le champ dans le formulaire**
2. **Mettez à jour le template** dans `createEmailTemplate()`
3. **Testez** !

### Changer l'adresse de réception

```bash
# Dans .env.local
ADMIN_EMAIL=nouveau@email.com
```

---

## 🔍 Dépannage

### ❌ "Invalid login"
- Vérifiez que l'authentification à 2 facteurs est activée
- Régénérez un nouveau mot de passe d'application
- Vérifiez que `EMAIL_USER` correspond au compte Gmail

### ❌ "Connection timeout"
- Vérifiez votre connexion internet
- Testez avec un autre réseau (parfois les réseaux d'entreprise bloquent SMTP)

### ❌ "Email not received"
- Vérifiez les spams
- Testez avec une autre adresse email
- Vérifiez que `ADMIN_EMAIL` est correct

### ❌ "Environment variables not loaded"
- Redémarrez le serveur de développement
- Vérifiez que le fichier s'appelle bien `.env.local`
- Vérifiez qu'il est à la racine du projet

---

## 📝 Templates d'emails populaires

### Gmail professionnel
```bash
EMAIL_USER=contact@votreentreprise.com
EMAIL_PASSWORD=mot_de_passe_application
ADMIN_EMAIL=dirigeant@votreentreprise.com
```

### OVH
```bash
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@votre-domaine.com
SMTP_PASSWORD=votre_mot_de_passe
```

### Ionos (1&1)
```bash
SMTP_HOST=smtp.ionos.fr
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@votre-domaine.com
SMTP_PASSWORD=votre_mot_de_passe
```

---

## 🚀 Déploiement

### Vercel
1. Ajoutez les variables dans le dashboard Vercel
2. Redéployez votre application

### Netlify
1. Site settings → Environment variables
2. Ajoutez chaque variable une par une

### Autres hébergeurs
Consultez leur documentation pour ajouter les variables d'environnement.

---

## ✅ Checklist finale

- [ ] Variables d'environnement configurées
- [ ] Mot de passe d'application Gmail créé
- [ ] Serveur de développement redémarré
- [ ] Test du formulaire effectué
- [ ] Email de confirmation reçu
- [ ] Email de notification reçu

**🎉 Félicitations ! Votre formulaire de contact envoie maintenant de vrais emails !**


