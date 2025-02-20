import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    target: 'esnext',  // or a specific version like 'es2021'
    lib: {
      entry: 'src/index.ts', // Entry point for the library
      name: 'YoosufIcons', // Name of the library
      fileName: (format) => `index.${format}.js`, // Output file name
      formats: ['es', 'umd'], // Output formats
    },
    rollupOptions: {
      external: ['vue'], // Mark Vue as external
      output: {
        globals: {
          vue: 'Vue', // Specify the global variable name for Vue
        },
      },
      onwarn(warning, warn) {
        if (warning.code === 'UNUSED_EXTERNAL') return; // Ignore unused external warnings
        warn(warning); // Use default warning handler
      },
      plugins: [
        {
          name: 'exclude-file-types',
          generateBundle(_, bundle) {
            // List of file types to exclude
            const excludeFileTypes = ['.html', '.css'];

            for (const file in bundle) {
              if (excludeFileTypes.some(type => file.endsWith(type))) {
                this.emitFile({ type: 'asset', fileName: file, source: '' });
                delete bundle[file]; // Remove excluded files from the bundle
              }
            }
          },
        },
      ],
    },
  },
});