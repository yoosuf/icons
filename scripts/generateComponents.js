import fs from 'fs'; // For synchronous operations
import fsPromises from 'fs/promises'; // For asynchronous operations
import path from 'path';

const svgSpritePath = path.resolve(new URL(import.meta.url).pathname, '../../public/svg-sprite.svg');
const outputDir = path.resolve(new URL(import.meta.url).pathname, '../../src/components');

async function generateComponents() {
    try {
        // Read the SVG sprite file
        const data = await fsPromises.readFile(svgSpritePath, 'utf8');

        // Create output directory if it doesn't exist
        if (!fs.existsSync(outputDir)) { fs.mkdirSync(outputDir); }

        // Extract symbol IDs from the SVG
        const symbolIds = [...data.matchAll(/<symbol id="(.*?)"/g)].map(match => match[1]);

        // Generate Vue components for each symbol ID
        symbolIds.forEach(id => {
            const camelCaseId = id.replace(/-\w/g, match => match[1].toUpperCase()).replace(/^\w/, c => c.toUpperCase());

            // Extract the specific symbol content
            const svgContentMatch = data.match(new RegExp(`<symbol id="${id}"(.*?)>([\\s\\S]*?)</symbol>`));
            const svgContent = svgContentMatch ? svgContentMatch[2] : ''; // Get the path content

            // Create the component content with properly formatted SVG
            const componentContent = `<template>
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg">
    ${svgContent} <!-- Embed the SVG content directly -->
  </svg>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  width: { type: String, default: '24' },
  height: { type: String, default: '24' },
  fill: { type: String, default: 'currentColor' },
  stroke: { type: String, default: 'none' },
  class: { type: String, default: '' },
  style: { type: String, default: '' },
  viewBox: { type: String, default: '0 0 24 24' },
  ariaHidden: { type: Boolean, default: true }
});
</script>`;

            // Write the component file
            fs.writeFileSync(path.join(outputDir, `${camelCaseId}.vue`), componentContent);
        });
        console.log('Vue components generated successfully!');
    } catch (err) {
        console.error('Error reading SVG sprite:', err);
    }
}

generateComponents();