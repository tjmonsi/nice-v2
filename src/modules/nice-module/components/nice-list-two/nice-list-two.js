
import 'polymer/polymer.html'
import '../nice-item/nice-item.js'
import './nice-list-two.html'

class NiceList extends Polymer.Element {
  static get is () { return 'nice-list-two' }

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

customElements.define(NiceList.is, NiceList)