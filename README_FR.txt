NOVA SURVIVAL V1 — démarrage

CE QUE FAIT CETTE V1
- Interface de discussion simple.
- Notes conservées dans le stockage local du navigateur.
- Mise en cache de l'interface via un Service Worker.
- Prévue pour être publiée gratuitement sur GitHub Pages ou un hébergement HTTPS équivalent.

LIMITES IMPORTANTES
- Ce n'est pas encore une IA générative : les réponses sont simples et prédéfinies.
- La mémoire est locale au navigateur/appareil. Elle peut être perdue si les données du site sont effacées.
- Une application ne peut pas fonctionner si l'iPhone est totalement déchargé.
- Le mode hors ligne doit être testé après la première visite en ligne.
- Ne stocke pas de mots de passe, données bancaires ou informations très sensibles.

INSTALLATION SUR IPHONE
1. Publier les fichiers sur un hébergement HTTPS (par exemple GitHub Pages).
2. Ouvrir l'adresse du site dans Safari sur l'iPhone.
3. Laisser la page charger complètement une première fois.
4. Appuyer sur Partager > Sur l'écran d'accueil > Ajouter.
5. Ouvrir NOVA depuis l'icône pendant que le téléphone est connecté.
6. Tester ensuite le mode avion et rouvrir l'application.

IMPORTANT POUR LA SUITE
Pour rendre l'application réellement installable/offline sur iOS, elle doit être servie en HTTPS.
Le fichier seul ouvert directement depuis l'application Fichiers ne suffit pas pour le Service Worker.
