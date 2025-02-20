import fs from 'fs';
import { promises as fsPromises } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgSpritePath = path.resolve(__dirname, '../public/svg-sprite.svg');
const outputDir = path.resolve(__dirname, '../src/components');
const indexFile = path.resolve(__dirname, '../src/index.ts');

async function generateComponents() {
    try {
        // Create a Set to track unique component names
        const uniqueComponentNames = new Set();
        // Read the SVG sprite file
        const data = await fsPromises.readFile(svgSpritePath, 'utf8');

        // Create output directory if it doesn't exist
        if (!fs.existsSync(outputDir)) { fs.mkdirSync(outputDir); }

        // Extract symbol IDs from the SVG
        const symbolIds = [...data.matchAll(/<symbol id="(.*?)"/g)].map(match => match[1]);

        // Generate Vue components for each symbol ID
        const uniqueSymbolIds = [...new Set(symbolIds)];
        uniqueSymbolIds.forEach(id => {
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
        // Generate index.ts file
        const exportStatements = uniqueSymbolIds.map(id => {
            const componentName = id.replace(/-\w/g, match => match[1].toUpperCase()).replace(/^\w/, c => c.toUpperCase());
            return `export { default as ${componentName}Icon } from './components/${componentName}.vue';`;
        });

        const indexContent = `// Auto-generated index file for @yoosuf/icons
${exportStatements.join('\n')}\n`;

        await fsPromises.writeFile(indexFile, indexContent, 'utf8');
        console.log('Vue components and index.ts generated successfully!');
    } catch (error) {
        console.error('Error reading SVG sprite:', error);
    }
}

export { generateComponents };

generateComponents().catch(error => {
    console.error('Error generating components:', error);
});