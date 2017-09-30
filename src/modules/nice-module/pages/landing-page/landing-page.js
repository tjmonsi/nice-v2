import 'polymer/polymer.html'
import '../../components/nice-story-row/nice-story-row.js'
import './landing-page.html'

class LandingPage extends Polymer.Element {
  static get is () { return 'landing-page' }
}

customElements.define(LandingPage.is, LandingPage)