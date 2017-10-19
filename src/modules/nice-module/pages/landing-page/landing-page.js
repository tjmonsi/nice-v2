import 'polymer/polymer.html'
import 'paper-button/paper-button.html'
import 'iron-ajax/iron-ajax.html'
import '../../components/nice-footer/nice-footer.js'
import '../../components/nice-story-row/nice-story-row.js'
import '../../components/nice-pas-row/nice-pas-row.js'
import '../../components/nice-dl-row/nice-dl-row.js'
import '../../components/price-watch-v1/price-watch-viewer.html'
import '../../components/weather-v1/weather-component.html'
import User from '../../components/user-model/user-model.js'
import './landing-page.html'

class LandingPage extends User(Polymer.Element) {
  static get is () { return 'landing-page' }
  
  handleResponse (res) {
    this.shadowRoot.querySelector('weather-component').setData(res.detail.response);
  }
}

customElements.define(LandingPage.is, LandingPage)