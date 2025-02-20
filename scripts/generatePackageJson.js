import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the existing package.json to get name, description, and version
const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Use the current version from package.json
const newVersion = packageJson.version;

// Define the new package.json content for the dist directory
const packageJsonContent = {
  name: packageJson.name,
  version: newVersion,
  description: packageJson.description,
  keywords: ["vue", "icons", "svg"],
  author: packageJson.author,
  license: packageJson.license,
  peerDependencies: {
    vue: "^3.0.0", // Specify peer dependencies
  },
  main: "dist/index.umd.js", // UMD build
  module: "dist/index.js", // ES Module build
  types: "dist/index.d.ts", // Type definitions
  type: "module",
  exports: {
    ".": {
      import: "./index.es.js",
      require: "./index.js",
      types: "./index.d.ts",
    },
    "./components/*": "./components/*"
  },
  files: ["dist/**/*.{js,ts,vue}"],
};

// Write the new package.json to the dist directory
const distDir = path.join(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}
fs.writeFileSync(path.join(distDir, 'package.json'), JSON.stringify(packageJsonContent, null, 2));
console.log('package.json generated successfully in dist directory!');
