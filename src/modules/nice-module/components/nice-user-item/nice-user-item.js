import 'polymer/polymer.html'
import 'paper-dropdown-menu/paper-dropdown-menu.html'
import 'paper-listbox/paper-listbox.html'
import 'paper-item/paper-item.html'
import 'paper-button/paper-button.html'
import Profile from '../user-model/profile-summary-model.js'
import './nice-user-item.html'

class NiceUserItem extends Profile(Polymer.Element) {
  static get is () { return 'nice-user-item' }
}

customElements.define(NiceUserItem.is, NiceUserItem)