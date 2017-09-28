import 'polymer/polymer.html'
import '../../components/nice-small-column/nice-small-column.js'
import './landing-page.html'

class LandingPage extends Polymer.Element {
  static get is () { return 'landing-page' }
}

customElements.define(LandingPage.is, LandingPage)