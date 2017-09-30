import 'polymer/polymer.html'
import './nice-dl-nav.html'

class NiceDlNav extends Polymer.Element {
  static get is () { return 'nice-dl-nav' }
}

customElements.define(NiceDlNav.is, NiceDlNav)