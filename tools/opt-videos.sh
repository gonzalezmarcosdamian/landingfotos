#!/usr/bin/env bash
# Transcodifica los cinematic de Cae a web (H.264, max 1080 ancho, CRF 21, audio AAC,
# faststart) + extrae poster. Todos son verticales 9:16.
set -e
SRC="/c/sfsrc"
OUT="c:/Users/gonza/OneDrive/Documentos/landingfotos/public/projects"

declare -A MAP=(
  ["get-motivated"]="deporte/get motivated cinematic.mov"
  ["bsa-boat-syndication"]="real estate/bsa boat syndication cinematic.mov"
  ["country-club"]="gastro/country club cinematic.MP4"
  ["private-house-cinematic"]="real estate/private house cinematic.mov"
  ["squires-ink"]="tattoo studios videos/squires ink cinematic.MP4"
  ["beauty-by-laser"]="estética/beauty by laser cinematic.MP4"
)

for slug in "${!MAP[@]}"; do
  in="$SRC/${MAP[$slug]}"
  if [ ! -f "$in" ]; then echo "MISS: $in"; continue; fi
  echo ">> $slug"
  ffmpeg -y -i "$in" \
    -vf "scale='min(1080,iw)':-2" \
    -c:v libx264 -crf 21 -preset slow -pix_fmt yuv420p \
    -c:a aac -b:a 128k -movflags +faststart \
    "$OUT/$slug.mp4" 2>/dev/null
  ffmpeg -y -ss 1 -i "$OUT/$slug.mp4" -frames:v 1 -q:v 3 "$OUT/$slug-poster.jpg" 2>/dev/null
  echo "   done: $(du -h "$OUT/$slug.mp4" | cut -f1)"
done
echo "ALL DONE"
