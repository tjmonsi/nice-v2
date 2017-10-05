import 'polymer/polymer.html'
import Profile from '../user-model/profile-model.js'
import './nice-user-form.html'

class NiceUserForm extends Profile(Polymer.Element) {
  static get is () { return 'nice-user-form' }
}

customElements.define(NiceUserForm.is, NiceUserForm)