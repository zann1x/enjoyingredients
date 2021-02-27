const { i18n } = require('./next-i18next.config')

module.exports = {
    compress: false,
    i18n,
    // TODO: Maybe add this or let Vercel handle this or something?
    //       See https://nextjs.org/docs/basic-features/image-optimization#configuration
    // images: {
    //     domain: ['cms.enjoyingredients.com']
    // },
    reactStrictMode: true,
};
