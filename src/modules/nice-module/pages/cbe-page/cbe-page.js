import 'polymer/polymer.html'
import '../../components/nice-footer/nice-footer.js'
import '../../components/nice-article/nice-article.js'
import '../../components/nice-pas-nav/nice-pas-nav.js'
import './cbe-page.html'

class CbePage extends Polymer.Element {
  static get is () { return 'cbe-page' }
  
  reload () {
    document.title = `Project NICE | Center for Bayanihan Economics`
  }
}

customElements.define(CbePage.is, CbePage)