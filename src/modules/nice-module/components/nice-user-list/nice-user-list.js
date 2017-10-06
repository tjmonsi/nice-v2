import 'polymer/polymer.html'
import '../nice-user-item/nice-user-item.js'
import UserList from '../user-model/member-list-model.js'
import './nice-user-list.html'

class NiceUserList extends UserList(Polymer.Element) {
  static get is () { return 'nice-user-list' }

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