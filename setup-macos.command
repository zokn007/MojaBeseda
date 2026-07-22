#!/bin/bash
set -e
cd "$(dirname "$0")"

clear
echo "============================================"
echo " MojaBeseda 1.2 – Firebase Spark nastavitev"
echo "============================================"
echo
echo "Ta pomočnik pripravi konfiguracijo in objavi aplikacijo."
echo "V Firebase Console mora biti že ustvarjen projekt in spletna aplikacija."
echo
read -r -p "Firebase Project ID: " PROJECT_ID
if [ -z "$PROJECT_ID" ]; then echo "Project ID je obvezen."; exit 1; fi

read -r -p "Firebase apiKey: " API_KEY
read -r -p "Firebase authDomain [$PROJECT_ID.firebaseapp.com]: " AUTH_DOMAIN
AUTH_DOMAIN=${AUTH_DOMAIN:-$PROJECT_ID.firebaseapp.com}
read -r -p "Firebase messagingSenderId: " SENDER_ID
read -r -p "Firebase appId: " APP_ID

cat > firebase-config.js <<CONFIG
window.MOJABESEDA_FIREBASE_CONFIG = {
  apiKey: "$API_KEY",
  authDomain: "$AUTH_DOMAIN",
  projectId: "$PROJECT_ID",
  storageBucket: "$PROJECT_ID.firebasestorage.app",
  messagingSenderId: "$SENDER_ID",
  appId: "$APP_ID"
};
CONFIG

cat > .firebaserc <<CONFIG
{"projects":{"default":"$PROJECT_ID"}}
CONFIG

echo
echo "Konfiguracija je ustvarjena."

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js ni nameščen. Odpiram uradno stran za namestitev."
  open "https://nodejs.org/en/download" || true
  echo "Po namestitvi Node.js znova zaženi to datoteko."
  exit 1
fi

if ! command -v firebase >/dev/null 2>&1; then
  echo "Nameščam Firebase CLI ..."
  npm install -g firebase-tools
fi

echo
echo "Odprla se bo Google prijava za Firebase CLI."
firebase login

echo
echo "Preverjam projekt ..."
firebase use "$PROJECT_ID"

echo
echo "Objavljam Hosting, Firestore pravila in indekse ..."
firebase deploy --only hosting,firestore

echo
echo "============================================"
echo " MojaBeseda je objavljena."
echo "============================================"
read -r -p "Pritisni Enter za zaključek ..."
