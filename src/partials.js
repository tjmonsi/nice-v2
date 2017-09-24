
    export default {
      'header': () => { return import(/* webpackChunkName: "nice-header" */ './modules/nice-module/components/nice-header/nice-header.js') }, 
'drawer': () => { return import(/* webpackChunkName: "nice-drawer" */ './modules/nice-module/components/nice-drawer/nice-drawer.js') }
    }
  