import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import path from 'pathe'
import fs from 'fs'
import Icons from 'unplugin-icons/webpack'
import { pascalCase } from 'change-case'

const iconsPath = path.join(process.cwd(), '/src/assets/icons')

export const IconsPluginCustom = () => Icons({
  compiler: 'jsx',
  jsx: 'react',
  customCollections: {
    icon: FileSystemIconLoader(iconsPath)
  }
})

export const IconsImports = () => {
  return fs.readdirSync(iconsPath).map(file => {
    const fileName = path.parse(file).name
    return {
      from: `~icons/icon/${fileName}.jsx`,
      imports: [['default', `Icon${pascalCase(fileName)}`]]
    }
  })
}
