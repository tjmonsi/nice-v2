import 'polymer/polymer.html'
import '../nice-small-column/nice-small-column.js'
import './nice-story-row.html'

class NiceStoryRow extends Polymer.Element {
  static get is () { return 'nice-story-row' }
}

customElements.define(NiceStoryRow.is, NiceStoryRow)