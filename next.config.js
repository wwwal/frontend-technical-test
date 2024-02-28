module.exports = {
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
  env: {
    API_HOST: process.env.API_HOST,
  },
}