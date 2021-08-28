import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js', '.ts'];

export default {
  input: ['./packages/ts-prop/src/index.ts'],
  output: [
    { file: 'dist/index.cjs.js', format: 'cjs' },
    { file: 'dist/index.cjs.prod.js', format: 'cjs', plugins: [terser()] },
    { file: 'dist/index.esm-browser.js', format: 'esm' },
    {
      file: 'dist/index.esm-browser.prod.js',
      format: 'esm',
      plugins: [terser()],
    },
  ],
  plugins: [
    resolve({
      extensions,
      modulesOnly: true,
      preferredBuiltins: false,
    }),
    commonjs(),
    json({
      namedExports: false,
    }),
    typescript({
      tsconfig: 'tsconfig.json',
      tsconfigOverride: {
        declaration: true,
        declarationMap: false,
      },
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production'),
      __buildDate__: () => JSON.stringify(new Date()),
      __buildVersion: 15,
    }),
  ],
};
