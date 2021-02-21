module.exports = {
    compress: false,
    i18n: {
        locales: ['de'],
        defaultLocale: 'de',
        domains: [
            {
                domain: 'enjoyingredients.de',
                defaultLocale: 'de',
            },
        ],
    },
    // TODO: Maybe add this or let Vercel handle this or something?
    //       See https://nextjs.org/docs/basic-features/image-optimization#configuration
    // images: {
    //     domain: ['cms.enjoyingredients.com']
    // },
    reactStrictMode: true,
};
