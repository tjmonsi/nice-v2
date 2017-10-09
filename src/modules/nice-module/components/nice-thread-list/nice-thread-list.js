import 'polymer/polymer.html'
import '../nice-thread-item/nice-thread-item.js'
import ThreadList from '../thread-model/thread-list-model.js'
import './nice-thread-list.html'

class NiceThreadList extends ThreadList(Polymer.Element) {
  static get is () { return 'nice-thread-list' }

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

customElements.define(NiceThreadList.is, NiceThreadList)