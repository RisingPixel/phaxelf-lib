/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

import resolve from 'rollup-plugin-node-resolve';
import cleanup from 'rollup-plugin-cleanup';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: [{
    file: './build/phaxelf.js',
    format: 'umd',
    name: 'phaxelf',
    sourcemap: true,
  }, {
    file: './build/phaxelf.module.js',
    format: 'es',
    sourcemap: true,
  }],
  watch: {
    include: 'src/**',
  },
  plugins: [
    resolve(),
    babel({
      plugins: ['external-helpers'],
      exclude: 'node_modules/**',
    }),
    cleanup(),
  ],
};
