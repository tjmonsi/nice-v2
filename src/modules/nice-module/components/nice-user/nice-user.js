import 'polymer/polymer.html'
import Profile from '../user-model/profile-model.js'
import './nice-user.html'

class NiceUser extends Profile(Polymer.Element) {
  static get is () { return 'nice-user' }
}

customElements.define(NiceUser.is, NiceUser)