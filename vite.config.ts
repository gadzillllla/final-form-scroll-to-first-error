import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts'
import { readdirSync, statSync } from 'fs';

const path = require('path');
const projectRootDir = path.resolve(__dirname);
const srcFiles = readdirSync(path.join(projectRootDir, 'src'));
const srcFolders = srcFiles.filter((fileName) => {
  const fileStat = statSync(path.join(projectRootDir, 'src', fileName));
  return fileStat.isDirectory();
});

const alias = srcFolders.reduce((acc, folderName) => {
  acc[folderName] = path.join(projectRootDir, 'src', folderName);
  return acc;
}, {});


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ActCanvaser',
      fileName: (format) => `index.${format}.js`,
      formats: ['es']
    },
    rollupOptions: {
      output: {
        format: 'esm'
      }
    }
  }
});
