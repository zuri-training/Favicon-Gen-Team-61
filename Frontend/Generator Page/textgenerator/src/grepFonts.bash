#!/usr/bin/env bash
KEY=$AIzaSyDpxVUdMb2jpsMBN9TrRXp0uxuSiMjeKU4
OUTPUT_FILE="./googleFonts.json"

echo '[' > $OUTPUT_FILE

curl -s "https://www.googleapis.com/webfonts/v1/webfonts?key=$KEY&sort=alpha" | \
  sed -n 's/ *"family": "\(.*\)",/  "\1",/p' | \
  sed '$s/\(.*\),/\1/' >> $OUTPUT_FILE

echo ']' >> $OUTPUT_FILE