// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import AutoImports from 'unplugin-auto-import/webpack'

import NextImports from './next-imports.js'
import { IconsPluginCustom, IconsImports } from './icons-imports.js'

export const AutoImportsIconsPlugin = IconsPluginCustom
export const AutoImportsPlugin = () => AutoImports({
  dts: './dts/auto-imports.d.ts',

  dirs: [
    './src/components/**/*.tsx',
    './src/app/**/components/**/*.tsx',
    './src/context',
    './src/core/*.ts',
    './src/schemas'
  ],

  eslintrc: {
    enabled: true
  },

  imports: [
    'react',
    'react-i18next',
    {
      from: 'react',
      imports: ['FC'],
      type: true
    },
    {
      from: 'react-hook-form',
      imports: ['useForm'],
      type: true
    },
    {
      zod: ['z']
    },
    {
      from: '@prisma/client',
      imports: [['User', 'PrismaUser'], ['ToDoRecord', 'PrismaToDoRecord']],
      type: true
    },
    // AntImports,
    ...IconsImports(),
    ...NextImports
  ]
})
