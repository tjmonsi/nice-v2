import 'polymer/polymer.html'
import 'paper-ripple/paper-ripple.html'
import User from '../user-model/user-model.js'
import Permission from '../permission-model/permission-model.js'
import './nice-nav.html'

class NiceNav extends Permission(User(Polymer.Element)) {
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