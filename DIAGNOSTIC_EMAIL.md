# 🔍 Diagnostic Email - Guide rapide

## 1. Vérifier la configuration

### Testez votre configuration :
```
http://localhost:3000/api/contact/test
```

Vous devriez voir :
```json
{
  "config": {
    "EMAIL_USER": true,
    "EMAIL_PASSWORD": true,
    "ADMIN_EMAIL": true
  },
  "status": "OK"
}
```

## 2. Créer le fichier .env.local

**Créez le fichier `.env.local` à la racine de votre projet :**

```bash
# Gmail Configuration
EMAIL_USER=votre.email@gmail.com
EMAIL_PASSWORD=abcd_efgh_ijkl_mnop
ADMIN_EMAIL=votre.email@gmail.com
```

## 3. Générer un mot de passe d'application Gmail

1. **Allez sur** : https://myaccount.google.com/security
2. **Activez l'authentification à 2 facteurs**
3. **Cliquez sur "Mots de passe des applications"**
4. **Sélectionnez "Autre"** et tapez "Portfolio Contact"
5. **Copiez le mot de passe généré** (16 caractères sans espaces)
6. **Collez-le dans EMAIL_PASSWORD**

## 4. Erreurs courantes

### ❌ "Configuration email manquante"
- Le fichier `.env.local` n'existe pas
- Les variables ne sont pas définies
- Redémarrez le serveur après création du fichier

### ❌ "Invalid login"
- Mauvais email ou mot de passe
- L'authentification à 2 facteurs n'est pas activée
- Utilisez un mot de passe d'application, pas votre mot de passe Gmail

### ❌ "Connection timeout"
- Problème de réseau
- Certains réseaux d'entreprise bloquent SMTP

## 5. Test rapide

1. **Redémarrez votre serveur** : `npm run dev`
2. **Testez la config** : `http://localhost:3000/api/contact/test`
3. **Testez le formulaire** : `http://localhost:3000/contact`

## 6. Logs utiles

Regardez la console de votre serveur pour voir les erreurs détaillées.


