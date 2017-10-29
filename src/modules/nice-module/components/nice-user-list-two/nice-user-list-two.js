import 'polymer/polymer.html'
import '../nice-user-item/nice-user-item.js'
import './nice-user-list-two.html'

class NiceUserList extends Polymer.Element {
  static get is () { return 'nice-user-list-two' }

  static get properties () {
    return {
      title: String,
      limit: {
        type: Number,
        value: -1
      }
    }
  }
}

customElements.define(NiceUserList.is, NiceUserList)