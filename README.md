# illumina-take-home

https://illumina-yongjun.netlify.app/

This application is a combines three of tasks: Flash Card Game (7), Analog Clock (2) & Roman Numeral Convertor (9).

The game behaves mostly the same as described in the assignment with a couple of small changes.

1. A hard mode is added where user reads and answers the arithmetic questions in Roman Numerals.
2. The number ranges from 1-16.
3. To simplify the handling of subtraction and division (negative numbers, fractional results etc), I've changed the ordering from `a + b = c where a, b ∈ [1,16]` and `a * b = c where a, b ∈ [1,16]` for additional and multiplication respectively to `c - a = b where a, b ∈ [1,16]` and `c - a = b where a, b ∈ [1,16]` for subtraction and division respectively.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
