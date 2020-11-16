import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import scss from "rollup-plugin-scss"
import pkg from './package.json';

export default {
    input: 'src/index.tsx',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true
        },
        {
            file: pkg.module,
            format: 'es',
            exports: 'named',
            sourcemap: true
        }
    ],
    plugins: [
        typescript(),
        commonjs(),
        scss()
    ]
}