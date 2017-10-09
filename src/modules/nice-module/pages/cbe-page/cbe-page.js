import 'polymer/polymer.html'
import '../../components/nice-footer/nice-footer.js'
import '../../components/nice-pas-row/nice-pas-row.js'
import '../../components/nice-pas-nav/nice-pas-nav.js'
import './cbe-page.html'

class CbePage extends Polymer.Element {
  static get is () { return 'cbe-page' }
}

customElements.define(CbePage.is, CbePage)