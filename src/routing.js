
    export default {
      '/': () => { return import(/* webpackChunkName: "landing-page" */ './modules/nice-module/pages/landing-page/landing-page.js') }, 
'/login': () => { return import(/* webpackChunkName: "login-page" */ './modules/nice-module/pages/login-page/login-page.js') }
    }
  