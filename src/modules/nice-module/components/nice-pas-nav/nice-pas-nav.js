import 'polymer/polymer.html'
import './nice-pas-nav.html'

class NicePasNav extends Polymer.Element {
  static get is () { return 'nice-pas-nav' }
}

customElements.define(NicePasNav.is, NicePasNav)