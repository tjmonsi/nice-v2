import 'polymer/polymer.html'
import 'paper-ripple/paper-ripple.html'
import Redux from '../nice-redux/nice-redux.js'
import User from '../nice-user/nice-user.js'
import './nice-nav.html'

class NiceNav extends Redux(User(Polymer.Element)) {
  static get is () { return 'nice-nav' }

  static get properties () {
    return {
      drawer: {
        type: Boolean,
        value: false
      },
      navList: {
        type: Array,
        statePath: 'navList'
      }
    }
  }
}

customElements.define(NiceNav.is, NiceNav)