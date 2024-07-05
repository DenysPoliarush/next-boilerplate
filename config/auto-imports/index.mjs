import AutoImports from 'unplugin-auto-import/webpack'

import NextImports from './next-imports.mjs'
import { IconsPluginCustom, IconsImports } from './icons-imports.mjs'

export const AutoImportsIconsPlugin = IconsPluginCustom
export const AutoImportsPlugin = () => AutoImports({
  dts: './dts/auto-imports.d.ts',

  dirs: [
    './components/**/*.tsx',
    './app/**/components/**/*.tsx',
    './context',
    './core/*.ts',
    './schemas',
    './lib/**/*.ts'
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
