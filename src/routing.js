
    export default {
      '/': () => { return import(/* webpackChunkName: "landing-page" */ './modules/nice-module/pages/landing-page/landing-page.js') }, 
'/login': () => { return import(/* webpackChunkName: "login-page" */ './modules/nice-module/pages/login-page/login-page.js') }, 
'/cbe': () => { return import(/* webpackChunkName: "cbe-page" */ './modules/nice-module/pages/cbe-page/cbe-page.js') }, 
'/story/:id?/:edit?': () => { return import(/* webpackChunkName: "story-page" */ './modules/nice-module/pages/story-page/story-page.js') }, 
'/about/:id?/:edit?': () => { return import(/* webpackChunkName: "about-page" */ './modules/nice-module/pages/about-page/about-page.js') }, 
'/cberecommends/:id?/:edit?': () => { return import(/* webpackChunkName: "cbe-recommends-page" */ './modules/nice-module/pages/cbe-recommends-page/cbe-recommends-page.js') }, 
'/pas/:id?/:edit?': () => { return import(/* webpackChunkName: "pas-page" */ './modules/nice-module/pages/pas-page/pas-page.js') }, 
'/dl/:id?/:edit?': () => { return import(/* webpackChunkName: "dl-page" */ './modules/nice-module/pages/dl-page/dl-page.js') }, 
'/dl-state-universities/:id?/:edit?': () => { return import(/* webpackChunkName: "dl-state-universities-page" */ './modules/nice-module/pages/dl-state-universities-page/dl-state-universities-page.js') }, 
'/dl-other-partners/:id?/:edit?': () => { return import(/* webpackChunkName: "dl-other-partners-page" */ './modules/nice-module/pages/dl-other-partners-page/dl-other-partners-page.js') }, 
'/resource/:id?/:edit?': () => { return import(/* webpackChunkName: "resource-page" */ './modules/nice-module/pages/resource-page/resource-page.js') }, 
'/community/:id?/:edit?': () => { return import(/* webpackChunkName: "community-page" */ './modules/nice-module/pages/community-page/community-page.js') }, 
'/thread/:id?': () => { return import(/* webpackChunkName: "thread-page" */ './modules/nice-module/pages/thread-page/thread-page.js') }
    }
  