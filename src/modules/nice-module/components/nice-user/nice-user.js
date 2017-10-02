import 'polymer/polymer.html'
import Profile from '../user-model/profile-model.js'
import './nice-item.html'

class NiceItem extends Profile(Polymer.Element) {
  static get is () { return 'nice-item' }
}

customElements.define(NiceItem.is, NiceItem)