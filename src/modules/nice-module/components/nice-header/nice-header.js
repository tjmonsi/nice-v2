import 'polymer/polymer.html'
import 'app-layout/app-header/app-header.html'
import 'app-layout/app-toolbar/app-toolbar.html'
import 'paper-icon-button/paper-icon-button.html'
import '../nice-nav/nice-nav.js'
import '../nice-icon/nice-icon.html'
import './nice-header.html'

class NiceHeader extends Polymer.Element {
  static get is () { return 'nice-header' }

  openDrawer () {
    window.dispatchEvent(new CustomEvent('open-drawer'))
  }
}

customElements.define(NiceHeader.is, NiceHeader)