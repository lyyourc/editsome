import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'
const { getDirName } = require('./scripts/index.js')
const publicFiles = require('./scripts/publicFiles')

const extensions = ['.ts', '.tsx', '.js', '.jsx', '.json']
const external = Object.keys(pkg.peerDependencies || {})

export default {
  input: publicFiles,
  output: [
    {
      dir: getDirName(pkg.main),
      format: 'cjs',
      // exports: "named",
    },
    {
      dir: getDirName(pkg.module),
      format: 'es',
    },
  ],
  external,
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      extensions,
    }),
    resolve({ extensions }),
  ],
}
