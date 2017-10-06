import 'polymer/polymer.html'
import '../nice-icon/nice-icon.html'
import 'iron-icon/iron-icon.html'
import Profile from '../user-model/member-model.js'
import './nice-user.html'

class NiceUser extends Profile(Polymer.Element) {
  static get is () { return 'nice-user' }
}

customElements.define(NiceUser.is, NiceUser)