/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
/** @type {import("next").NextConfig} */

// import { AutoImportsPlugin, AutoImportsIconsPlugin } from './src/config/auto-imports/auto-imports.js'
// import bundleAnalyzer from '@next/bundle-analyzer'

await import('./src/env.js')

const nextConfig = {
  publicRuntimeConfig: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL
  },
  reactStrictMode: true,
  // pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js', 'api.ts'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'test-upload-picture-buckjet.s3.eu-north-1.amazonaws.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: ''
      }
    ]
  }
  // webpack: (config) => {
  //   config.plugins.push(AutoImportsPlugin())
  //   config.plugins.push(AutoImportsIconsPlugin())
  //   return config
  // }
}

// export default bundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
//   openAnalyzer: true
// })(nextConfig)
export default nextConfig
