/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL
  },
  transpilePackages: ['leaflet'],
  async redirects() {
    return [
      {
        source: '/lk/profile',
        destination: '/lk',
        permanent: true,
      }
    ]
  },
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kronfort.labab.ru',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'http',
        hostname: 'localhost:3000',
        port: '',
        pathname: '/'
      },
      {
        protocol: 'https',
        hostname: 'kronfort-back.labab.ru',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'back.kronfort.ru',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'api.kronfort.quantum747.tech', // Добавляем новый домен
        port: '',
        pathname: '/**'
      }
    ],
    minimumCacheTTL: 604800,
    deviceSizes: [480, 1280, 1920, 2560]
  },
  sassOptions: {
    additionalData: `@import '@modules';`
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: {
        loader: '@svgr/webpack',
        options: {
          svgo: false
        }
      }
    })

    config.module.rules
      .find(({ oneOf }) => !!oneOf)
      .oneOf.filter(({ use }) => JSON.stringify(use)?.includes('css-loader'))
      .reduce((acc, { use }) => acc.concat(use), [])
      .forEach(({ options }) => {
        if (options?.modules) {
          options.modules.exportLocalsConvention = 'camelCase'
        }
      })

    return config
  }
}

export default nextConfig
