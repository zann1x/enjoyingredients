export default {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            {rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'},
            {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.1/css/bulma.min.css'},
            {rel: 'stylesheet', href: 'https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css'}
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
    modules: [],
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
    env: {
        cockpit: {
            apiUrl: 'http://localhost:8080/api',
            apiToken: '87dc64fe625dee431fc7ab5fe7294f',
            baseUrl: 'http://localhost:8080'
        }
    }
}
