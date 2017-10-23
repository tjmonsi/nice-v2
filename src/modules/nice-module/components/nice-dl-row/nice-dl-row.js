import 'polymer/polymer.html'
import '../nice-list/nice-list.js'
import './nice-dl-row.html'

class NiceDlRow extends Polymer.Element {
  static get is () { return 'nice-dl-row' }
}

customElements.define(NiceDlRow.is, NiceDlRow)