# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Usage Instructions
1. **Installation**: Run `npm install` to install the dependencies.
2. **Development Server**: Use `npm run dev` to start the development server.
3. **Building the Project**: Run `npm run build` to create a production build.

## Using Locally with npm link
1. Navigate to the project directory and run `npm link` to create a global symlink.
2. In your other project, run `npm link <package-name>` to link the project.
3. To use the linked package in your project, import it in your JavaScript file like this: `import { MyComponent } from '<package-name>';`
4. To update the linked package, make changes to the source code and run `npm run build` to rebuild the package.
5. To unlink the package, run `npm unlink <package-name>` in your project directory.
