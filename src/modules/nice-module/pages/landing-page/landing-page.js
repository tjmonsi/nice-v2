import 'polymer/polymer.html'
import './landing-page.html'

class LandingPage extends Polymer.Element {
  static get is () { return 'landing-page' }
}

customElements.define(LandingPage.is, LandingPage)