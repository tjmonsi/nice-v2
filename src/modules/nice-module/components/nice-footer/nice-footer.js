import 'polymer/polymer.html'
import './nice-footer.html'

class NiceFooter extends Polymer.Element {
  static get is () { return 'nice-footer' }
}

customElements.define(NiceFooter.is, NiceFooter)