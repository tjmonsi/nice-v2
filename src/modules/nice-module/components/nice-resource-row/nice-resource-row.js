import 'polymer/polymer.html'
import '../nice-list/nice-list.js'
import './nice-resource-row.html'

class NiceResourceRow extends Polymer.Element {
  static get is () { return 'nice-resource-row' }
}

customElements.define(NiceResourceRow.is, NiceResourceRow)