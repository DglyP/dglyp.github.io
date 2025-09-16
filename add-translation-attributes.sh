#!/bin/bash

# Script to add data-translate attributes to index.html for multilingual support
# This script will help identify and mark translatable content

echo "Adding data-translate attributes to index.html..."

# Backup the original file
cp "/Users/anon/Documents/Personal/Degly_Website/dglyp.github.io/index.html" "/Users/anon/Documents/Personal/Degly_Website/dglyp.github.io/index_backup_translation.html"

# Define the file path
INDEX_FILE="/Users/anon/Documents/Personal/Degly_Website/dglyp.github.io/index.html"

# Use sed to add translation attributes to specific patterns
# Note: This approach will help us mark major sections systematically

# Update section headers
sed -i '' 's/<span class="heading-meta">\([^<]*\)<\/span>/<span class="heading-meta" data-translate="\L\1">\1<\/span>/g' "$INDEX_FILE"

echo "Basic translation attributes added. Manual review and completion needed."
echo "Backup saved as index_backup_translation.html"