import 'polymer/polymer.html'
import './nice-drawer.html'

class NiceDrawer extends Polymer.Element {
  static get is () { return 'nice-drawer' }
}

customElements.define(NiceDrawer.is, NiceDrawer)