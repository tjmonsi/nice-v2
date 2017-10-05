
    export default {
      'not-found': () => { return import(/* webpackChunkName: "not-found-page" */ './modules/nice-module/pages/not-found-page/not-found-page.js') }, 
'not-authorized': () => { return import(/* webpackChunkName: "not-authorized-page" */ './modules/nice-module/pages/not-authorized-page/not-authorized-page.js') }
    }
  