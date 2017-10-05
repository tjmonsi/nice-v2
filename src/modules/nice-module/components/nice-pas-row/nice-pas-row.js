import 'polymer/polymer.html'
import '../nice-small-column/nice-small-column.js'
import './nice-pas-row.html'

class NicePasRow extends Polymer.Element {
  static get is () { return 'nice-pas-row' }
}

customElements.define(NicePasRow.is, NicePasRow)