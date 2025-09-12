#!/usr/bin/env node

/**
 * Automatic Carousel Updater
 * 
 * This script scans the caroussel-photos folder and automatically updates
 * the carousel configuration in index.html
 * 
 * Usage: node update-carousel.js
 */

const fs = require('fs');
const path = require('path');

const carouselFolder = './images/caroussel-photos/';
const indexPath = './index.html';

// Supported image extensions
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

function getImageFiles() {
    try {
        const files = fs.readdirSync(carouselFolder);
        return files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return imageExtensions.includes(ext);
        }).sort(); // Sort alphabetically for consistent order
    } catch (error) {
        console.error('Error reading carousel folder:', error.message);
        return [];
    }
}

function updateIndexHtml(imageFiles) {
    try {
        let content = fs.readFileSync(indexPath, 'utf8');
        
        // Create the new image list array
        const imageListString = imageFiles.map(file => `'${file}'`).join(',\n\t\t\t');
        
        // Find and replace the carouselImageList array
        const regex = /const carouselImageList = \[[\s\S]*?\];/;
        const replacement = `const carouselImageList = [\n\t\t\t${imageListString}\n\t\t];`;
        
        const updatedContent = content.replace(regex, replacement);
        
        if (updatedContent !== content) {
            fs.writeFileSync(indexPath, updatedContent, 'utf8');
            console.log('✅ Successfully updated carousel configuration!');
            console.log(`📸 Found ${imageFiles.length} images:`);
            imageFiles.forEach(file => console.log(`   - ${file}`));
        } else {
            console.log('⚠️  No changes needed - carousel configuration is already up to date');
        }
        
    } catch (error) {
        console.error('Error updating index.html:', error.message);
    }
}

function main() {
    console.log('🔍 Scanning carousel folder...');
    
    const imageFiles = getImageFiles();
    
    if (imageFiles.length === 0) {
        console.log('❌ No images found in carousel folder');
        return;
    }
    
    console.log(`📁 Found ${imageFiles.length} images in ${carouselFolder}`);
    updateIndexHtml(imageFiles);
}

// Run the script
main();


