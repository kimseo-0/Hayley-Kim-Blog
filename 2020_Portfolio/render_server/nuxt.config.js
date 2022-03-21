module.exports = {
    server : {
        host: 'localhost',
        port: 3001
    },
    modules: [
        '@nuxtjs/axios'
    ],
    buildModules: [
        '@nuxtjs/vuetify',
        '@nuxtjs/moment'
    ],
    build: {
      vendor : [
          'vue-awesome-swiper',
          'jodit-vue'
      ]
    },
    head: {
        meta: [{
            charset: 'utf-8',
        }, {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
        }]
    },

    plugins: [
        { src: './plugins/jodit-plugin.js', ssr: false },
        { src: '~/plugins/vue-awesome-swiper-plugin.js', ssr: false }
    ],
    // some nuxt config...
    css: [
        'swiper/dist/css/swiper.css'
    ],
};