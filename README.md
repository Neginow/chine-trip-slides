# Voyage en Chine — Été 2026 🇨🇳

Présentation immersive de notre itinéraire de 17 jours / 16 nuits à travers la Chine,
construite avec [**Open Slide**](https://open-slide.dev) (slides = composants React, canvas fixe 1920×1080).

> Pékin → Chengdu → Chongqing → Zhangjiajie → Wangxian Valley → Wuyuan → Shanghai

Le deck complet vit dans **[`slides/chine-trip/index.tsx`](./slides/chine-trip/index.tsx)** : 21 pages
(titre, vue d’ensemble, carte du trajet, 16 nuits, récap transport, final), avec barre de
progression du voyage, transitions sobres et notes orateur (`export const notes`).

## Lancer la présentation

```bash
npm install      # dépendances (déjà installées si le projet a été scaffoldé)
npm run dev      # serveur de dev avec hot-reload → http://localhost:5173
```

Ouvre ensuite **http://localhost:5173/s/chine-trip**.
- Flèches / Page↑ / Page↓ : naviguer entre les pages
- `F` : mode plein écran (présentation) — Espace / → suivant, ← précédent, `Échap` pour sortir
- Bouton **Notes** dans l’en-tête : afficher les notes orateur

## Build & export

```bash
npm run build    # bundle statique (HTML/JS/CSS) dans dist/
npm run preview  # servir le bundle buildé en local pour vérifier
```

### Export PDF

Open Slide n’a pas d’export PDF natif — on passe par l’impression du navigateur (rendu pixel-perfect) :

1. `npm run preview` (ou `npm run dev`)
2. Ouvre `http://localhost:5173/s/chine-trip`, appuie sur `F` (plein écran), navigue page par page
3. Pour un PDF complet : ouvre la page dans **Chrome → Imprimer → Enregistrer en PDF**,
   format **paysage**, taille **personnalisée 1920×1080 px** (ou A4 paysage), marges **aucune**,
   « Graphiques d’arrière-plan » activé.

Le bundle `dist/` est aussi déployable tel quel (Netlify / Vercel — configs incluses).

## Structure

```
slides/chine-trip/
  index.tsx          # le deck (21 pages, design, transitions, notes)
  assets/            # 45 photos (Wikimedia Commons, licences libres)
image-sources.md     # toutes les images : fichier · sujet · auteur · licence · source
```

## Images

Toutes les photos viennent de **Wikimedia Commons** (CC0 / CC BY / CC BY-SA / domaine public).
La liste complète, avec crédits et liens sources, est dans **[`image-sources.md`](./image-sources.md)**.
La carte du trajet (page 3) est dessinée en **SVG** (pas d’image externe).

Chaque image correspond à **un lieu d’intérêt précis** (titre Commons vérifié). Deux lieux sans
photo libre fidèle (72 Qilou, teamLab Shanghai) utilisent un placeholder propre, remplaçable via
le panneau **Assets** d’Open Slide. Pour rafraîchir les images, les scripts sont dans le dossier
parent : `fetch_pois.py` (recherche + vérification par titre, écrit `pois.json`) puis
`download_images.py` (télécharge dans `assets/`).
