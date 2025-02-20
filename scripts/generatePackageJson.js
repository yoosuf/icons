import fs from 'fs';
import path from 'path';

// Load the existing package.json to get name, description, and version
const packageJsonPath = path.join(path.dirname(new URL(import.meta.url).pathname), '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Increment the version number
const versionParts = packageJson.version.split('.').map(Number);
versionParts[2]++; // Increment the patch version
const newVersion = versionParts.join('.');

// Define the new package.json content for the dist directory
const packageJsonContent = {
  name: packageJson.name,
  version: newVersion,
  description: packageJson.description,
  main: "dist/index.umd.js", // UMD build
  module: "dist/index.es.js", // ES Module build
  types: "dist/index.d.ts", // Type definitions
  keywords: ["vue", "icons", "svg"],
  author: packageJson.author,
  license: packageJson.license,
  peerDependencies: {
    vue: "^3.0.0", // Specify peer dependencies
  },
};

// Write the new package.json to the dist directory
const distDir = path.join(path.dirname(new URL(import.meta.url).pathname), '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}
fs.writeFileSync(path.join(distDir, 'package.json'), JSON.stringify(packageJsonContent, null, 2));
console.log('package.json generated successfully in dist directory!');

// Create index.ts in the src folder
const indexTsContent = `// Entry point for the icons package
export { default as ActivityIcon } from './components/Activity.vue';
export { default as ActivityHeartIcon } from './components/ActivityHeart.vue';
// Add other exports as needed
`;

fs.writeFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), '../src/index.ts'), indexTsContent);
console.log('index.ts created successfully in src directory!');