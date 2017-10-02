import 'polymer/polymer.html'
import User from '../user-model/user-model.js'
import './nice-community-nav.html'

class NiceCommunityNav extends User(Polymer.Element) {
  static get is () { return 'nice-community-nav' }
}

customElements.define(NiceCommunityNav.is, NiceCommunityNav)