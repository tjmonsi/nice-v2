import 'polymer/polymer.html'
import ArticleSummary from '../article-model/article-summary-model.js'
import './nice-about-nav-item.html'

class NiceAboutNavItem extends ArticleSummary(Polymer.Element) {
  static get is () { return 'nice-about-nav-item' }
}

customElements.define(NiceAboutNavItem.is, NiceAboutNavItem)