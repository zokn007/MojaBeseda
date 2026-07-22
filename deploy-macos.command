#!/bin/bash
set -e
cd "$(dirname "$0")"
if ! command -v firebase >/dev/null 2>&1; then
  echo "Firebase CLI ni nameščen. Najprej zaženi setup-macos.command."
  read -r -p "Pritisni Enter ..."
  exit 1
fi
firebase deploy --only hosting,firestore
read -r -p "Objava je končana. Pritisni Enter ..."
