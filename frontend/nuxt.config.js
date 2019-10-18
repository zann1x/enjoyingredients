export default {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        htmlAttrs: {
            lang: 'de'
        },
        title: process.env.npm_package_name || '',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#fff'},
    /*
    ** Global CSS
    */
    css: [],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [],
    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/axios',
        'nuxt-i18n'
    ],
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
        }
    },
    /*
    ** Watchers
    */
    watchers: {
        /*
        ** Webpack needs polling for hot reload as the filesystems on Windows and Linux are different and
        ** therefore save actions are not recognized in the Docker container otherwise
         */
        webpack: {
            poll: process.env.NODE_ENV !== 'production'
        }
    },
    /*
    ** i18n Module Settings
    */
    i18n: {
        seo: true,
        baseUrl: 'https://enjoyingredients.de',
        locales: [
            {
                code: 'de',
                iso: 'de-DE'
            }
        ],
        defaultLocale: 'de',
        vueI18n: {
            fallbackLocale: 'de'
        }
    }
}
