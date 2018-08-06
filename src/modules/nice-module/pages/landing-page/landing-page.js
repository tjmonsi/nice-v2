import 'polymer/polymer.html'
import 'paper-button/paper-button.html'
import 'iron-ajax/iron-ajax.html'
import 'iron-icon/iron-icon.html'
import '../../components/nice-footer/nice-footer.js'
import '../../components/nice-story-block/nice-story-block.js'
import '../../components/nice-story-row/nice-story-row.js'
import '../../components/nice-pas-row/nice-pas-row.js'
import '../../components/nice-dl-row/nice-dl-row.js'
import '../../components/nice-resource-row/nice-resource-row.js'
import '../../components/nice-article/nice-article.js'
import '../../components/nice-icon/nice-icon.html'
import '../../components/price-watch-v1/price-watch-viewer.html'
import '../../components/weather-v1/weather-component.html'
import '../../components/carousel-image/carousel-image.js'
import User from '../../components/user-model/user-model.js'
import Permission from '../../components/permission-model/permission-model.js';
import './landing-page.html'

class LandingPage extends Permission(User(Polymer.Element)) {
  static get is () { return 'landing-page' }
  
  handleResponse (res) {
    this.shadowRoot.querySelector('weather-component').setData(res.detail.response);
  }
}

customElements.define(LandingPage.is, LandingPage)